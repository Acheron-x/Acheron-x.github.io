document.addEventListener('DOMContentLoaded', function() {
  // Get the TOC element
  const toc = document.querySelector('.custom-toc');
  if (!toc) return;
  
  // Get the main content element
  const mainElement = document.querySelector("main") || document.body;
  
  // Store the original position of the TOC
  const tocOriginalPosition = toc.getBoundingClientRect().top + (mainElement.scrollTop || window.pageYOffset);
  
  // Get all headings in the content
  const headings = document.querySelectorAll('.post-content h1, .post-content h2, .post-content h3, .post-content h4, .post-content h5, .post-content h6');
  
  // Get all links in the TOC
  const tocLinks = document.querySelectorAll('.custom-toc a');
  
  // Function to make TOC sticky when scrolling
  function handleScroll() {
    if (!toc) return;
    
    // Get current scroll position (works in both window and element scrolling contexts)
    const scrollPosition = mainElement.scrollTop || window.pageYOffset;
    
    
    // Find the current section
    let currentSection = null;
    
    headings.forEach(function(heading) {
      const headingTop = heading.getBoundingClientRect().top + scrollPosition - mainElement.getBoundingClientRect().top;
      if (headingTop <= scrollPosition + 200) {
        currentSection = heading.id;
      }
    });
    
    // Remove active class from all links
    tocLinks.forEach(function(link) {
      link.classList.remove('active');
    });
    
    // Add active class to current section link
    if (currentSection) {
      const activeLink = document.querySelector('.custom-toc a[href="#' + currentSection + '"]');
      if (activeLink) {
        activeLink.classList.add('active');
        
        // Center the active link in the TOC if needed
        const tocHeight = toc.offsetHeight;
        const activeLinkPosition = activeLink.offsetTop;
        
        if (activeLinkPosition < toc.scrollTop || activeLinkPosition > toc.scrollTop + tocHeight) {
          toc.scrollTop = activeLinkPosition - (tocHeight / 2);
        }
      }
    }
  }
  
  // Listen for scroll events with debounce technique (like in your scroll.js)
  let scrollTimeout;
  mainElement.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(handleScroll, 10); // Quick response time
  });
  
  // Also listen to window scroll events for better compatibility
  window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(handleScroll, 10);
  });
  
  // Handle resize events to recalculate positions
  window.addEventListener('resize', function() {
    const tocNewPosition = toc.getBoundingClientRect().top + (mainElement.scrollTop || window.pageYOffset);
    if (!toc.classList.contains('sticky')) {
      tocOriginalPosition = tocNewPosition;
    }
    handleScroll();
  });
  
  // Initial call to set correct state
  setTimeout(handleScroll, 100);
});