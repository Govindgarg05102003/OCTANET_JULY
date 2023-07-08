// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
  
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // Form submission
  const form = document.querySelector('form');
  form.addEventListener('submit', function (e) {
    e.preventDefault();
  
    // Perform form submission handling here
    // For example, send data to a server or display a success message
  });
  