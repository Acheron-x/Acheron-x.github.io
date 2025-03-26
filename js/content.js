// Highlight the current section in TOC based on scroll position
document.addEventListener('DOMContentLoaded', function() {
  // Get all headings in the content
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  
  // Get all links in the TOC
  const tocLinks = document.querySelectorAll('.custom-toc a');
  
  if (headings.length === 0 || tocLinks.length === 0) {
    return; // Exit if no headings or TOC links found
  }
  
  // Create an array of heading positions
  const headingPositions = Array.from(headings).map(heading => {
    return {
      id: heading.id,
      top: heading.getBoundingClientRect().top + window.scrollY - 100
    };
  });
  
  // Function to highlight active section
  function highlightActiveSection() {
    const scrollPosition = window.scrollY;
    
    // Find the current heading based on scroll position
    let currentIndex = -1;
    for (let i = 0; i < headingPositions.length; i++) {
      if (headingPositions[i].top > scrollPosition) {
        break;
      }
      currentIndex = i;
    }
    
    // Remove 'active' class from all TOC links
    tocLinks.forEach(link => {
      link.classList.remove('active');
    });
    
    // Add 'active' class to current section link
    if (currentIndex >= 0 && headingPositions[currentIndex].id) {
      const currentId = headingPositions[currentIndex].id;
      const activeLink = document.querySelector(`.custom-toc a[href="#${currentId}"]`);
      if (activeLink) {
        activeLink.classList.add('active');
      }
    }
  }
  
  // Check active section on scroll
  window.addEventListener('scroll', highlightActiveSection);
  
  // Initialize on page load
  highlightActiveSection();
});