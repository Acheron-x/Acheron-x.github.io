// Script to maintain scroll position across page refreshes
(function() {
  // Don't run script if History API is not supported
  if (!window.history || !window.history.replaceState) return;
  
  // Create a unique ID for this page
  const pageId = window.location.pathname;
  
  // Function to save scroll position without changing URL hash
  function saveScrollPosition() {
    const scrollPos = window.scrollY || document.documentElement.scrollTop;
    
    // Store scroll position in sessionStorage
    sessionStorage.setItem('scrollPos_' + pageId, scrollPos);
    
    // Use hash fragments to persist scroll position in URL without scrolling
    // This is done by using replaceState instead of changing location.hash
    if (scrollPos > 0) {
      // Create a virtual "anchor" in the URL that represents scroll position
      const virtualAnchor = 'scroll_' + scrollPos;
      history.replaceState(null, null, '#' + virtualAnchor);
    } else {
      // Remove hash if at the top
      history.replaceState(null, null, window.location.pathname);
    }
    
    console.log('Saved position:', scrollPos);
  }
  
  // Function to restore scroll position
  function restoreScrollPosition() {
    // First check if there's a scroll position in the URL hash
    const hash = window.location.hash;
    let scrollPos = 0;
    
    if (hash && hash.indexOf('#scroll_') === 0) {
      // Extract scroll position from hash
      scrollPos = parseInt(hash.replace('#scroll_', ''));
    } else {
      // If no hash or not our format, try to get from sessionStorage
      const savedPos = sessionStorage.getItem('scrollPos_' + pageId);
      if (savedPos) {
        scrollPos = parseInt(savedPos);
      }
    }
    
    // Wait a bit for page to finish loading, then scroll
    if (scrollPos && scrollPos > 0) {
      console.log('Will restore to:', scrollPos);
      // Use setTimeout to ensure the page has loaded
      setTimeout(function() {
        window.scrollTo(0, scrollPos);
        console.log('Restored to position:', scrollPos);
      }, 300);
    }
  }
  
  // Save position when user scrolls (throttled)
  let scrollTimeout;
  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(saveScrollPosition, 200);
  });
  
  // Save position before leaving the page
  window.addEventListener('beforeunload', function() {
    saveScrollPosition();
  });
  
  // Restore position when page loads
  window.addEventListener('load', restoreScrollPosition);
  
  // If we have a hash, also try to restore immediately
  if (window.location.hash) {
    restoreScrollPosition();
  }
  
  console.log('Scroll position manager initialized');
})();
