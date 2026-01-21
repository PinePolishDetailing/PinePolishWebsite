/**
 * Pine Polish Cart Detailing
 * Main JavaScript functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initNavigation();
  initHeaderScroll();
  initBookingWidget();
  initAnimations();
});

/**
 * Mobile Navigation Toggle
 */
function initNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }
}

/**
 * Header scroll effect
 */
function initHeaderScroll() {
  const header = document.querySelector('.header');
  
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial state
  }
}

/**
 * Booking Widget Toggle
 */
function initBookingWidget() {
  const bookingTrigger = document.querySelector('.booking-trigger');
  const bookingPanel = document.querySelector('.booking-panel');

  if (bookingTrigger && bookingPanel) {
    bookingTrigger.addEventListener('click', () => {
      bookingPanel.classList.toggle('active');
    });

    // Close panel when clicking outside
    document.addEventListener('click', (e) => {
      if (!e.target.closest('.booking-widget')) {
        bookingPanel.classList.remove('active');
      }
    });
  }
}

/**
 * Scroll-triggered animations
 */
function initAnimations() {
  const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .about-image, .about-text');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach((el, index) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
      observer.observe(el);
    });
  }
}

/**
 * Smooth scroll for anchor links
 */
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
