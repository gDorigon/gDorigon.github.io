// Mobile Menu Toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
   navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on links
document.querySelectorAll('.nav-menu a').forEach(link => {
   link.addEventListener('click', () => {
      navMenu.classList.remove('active');
   });
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
   anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
         target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
         });
      }
   });
});

// Plan selector functionality
const planButtons = document.querySelectorAll('.plan-btn');
const planContents = document.querySelectorAll('.plan-content');

planButtons.forEach(button => {
   button.addEventListener('click', () => {
      // Remove active class from all buttons and contents
      planButtons.forEach(btn => btn.classList.remove('active'));
      planContents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked button
      button.classList.add('active');

      // Show corresponding plan content
      const planType = button.getAttribute('data-plan');
      document.getElementById(planType).classList.add('active');
   });
});

// Fade in animation on scroll
const observerOptions = {
   threshold: 0.1,
   rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
   entries.forEach(entry => {
      if (entry.isIntersecting) {
         entry.target.classList.add('visible');
      }
   });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
   observer.observe(el);
})

window.addEventListener('scroll', () => {
   const header = document.querySelector('.header');
   if (window.scrollY > 50) {
      header.classList.add('scrolled');
   } else {
      header.classList.remove('scrolled');
   }
});
