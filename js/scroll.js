// Function to save scroll position
function saveScrollPosition() {
  const mainElement = document.querySelector("main");
  if (!mainElement) return;
  localStorage.setItem("scrollPos", mainElement.scrollTop.toString());
}

// Function to restore scroll position
function restoreScrollPosition() {
  const mainElement = document.querySelector("main");
  if (!mainElement) return;
  
  const scrollTop = localStorage.getItem("scrollPos");
  if (!scrollTop || isNaN(scrollTop)) return;
  
  // Immediate attempt first
  mainElement.scrollTop = parseInt(scrollTop);
  
  // Quick follow-up to ensure it sticks (reduced delay time)
  setTimeout(() => {
      mainElement.scrollTop = parseInt(scrollTop);
  }, 50); // Reduced from 200ms to 50ms
}

// Set up scroll event listener
document.addEventListener('DOMContentLoaded', () => {
  const mainElement = document.querySelector("main");
  if (!mainElement) return;
  
  // Scroll event with debounce technique
  let scrollTimeout;
  mainElement.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(saveScrollPosition, 100);
  });
});

// Restore scroll position when page is fully loaded
window.addEventListener('load', () => {
  restoreScrollPosition();
});