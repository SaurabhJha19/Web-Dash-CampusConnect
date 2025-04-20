document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');
  
  // Toggle the navigation menu on mobile
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  });
  
  // Close menu when link is clicked
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });
  
  // Make entire search bar clickable and redirect
  const searchBox = document.getElementById('search-box');
  searchBox.addEventListener('click', () => {
    window.location.href = 'search-results.html';
  });

  const searchBoxm = document.getElementById('mobile-search');
  searchBoxm.addEventListener('click', () => {
    window.location.href = 'search-results.html';
  });
  
  // Login button click handler
  const loginButtonm = document.getElementById('mobile-login-button');
  loginButtonm.addEventListener('click', () => {
    window.location.href = 'login.html';
  });
  const loginButtond = document.getElementById('desktop-login-button');
  loginButtond.addEventListener('click', () => {
    window.location.href = 'login.html';
  });
  const loginButton = document.getElementById('login-button');
  loginButton.addEventListener('click', () => {
    window.location.href = 'login.html';
  });
});


//   ----------------------------------------------------------------------------------------

    // Animation for fade-in elements
    document.addEventListener('DOMContentLoaded', function() {
      // Initial check for elements in viewport
      checkElementsInViewport();
      
      // Check on scroll
      window.addEventListener('scroll', function() {
        checkElementsInViewport();
      });
      
      function checkElementsInViewport() {
        const fadeElements = document.querySelectorAll('.fade-in');
        
        fadeElements.forEach(function(element) {
          const elementTop = element.getBoundingClientRect().top;
          const elementBottom = element.getBoundingClientRect().bottom;
          
          // Check if element is in viewport
          if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
            element.classList.add('active');
          }
        });
      }
    });