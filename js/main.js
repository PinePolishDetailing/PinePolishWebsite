/**
 * Pine Polish Cart Detailing
 * Main JavaScript functionality
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  initNavigation();
  initHeaderScroll();
  initAnimations();
  initNavActiveState();
  initParallax();
});

/**
 * Mobile Navigation Toggle
 */
function initNavigation() {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    const setMenuOpen = (open) => {
      navToggle.classList.toggle('active', open);
      navLinks.classList.toggle('active', open);
      document.body.classList.toggle('nav-open', open);
    };

    navToggle.addEventListener('click', () => {
      setMenuOpen(!navLinks.classList.contains('active'));
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        setMenuOpen(false);
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
 * Scroll-triggered animations
 */
function initAnimations() {
  const animatedElements = document.querySelectorAll('.service-card, .testimonial-card, .about-image, .about-text, .cta-content');
  
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
 * Parallax effect for hero section
 */
function initParallax() {
  const hero = document.querySelector('.hero');
  const parallaxLogo = document.querySelector('[data-parallax]');

  if (!hero || !parallaxLogo) return;

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const mobileQuery = window.matchMedia('(max-width: 768px)');

  if (prefersReducedMotion || mobileQuery.matches) return;

  const handleParallax = () => {
    if (mobileQuery.matches) {
      parallaxLogo.style.transform = '';
      return;
    }

    const scrollY = window.scrollY;
    const heroHeight = hero.offsetHeight;

    if (scrollY < heroHeight) {
      const factor = parseFloat(parallaxLogo.getAttribute('data-parallax')) || 0.15;
      const offset = scrollY * factor;
      parallaxLogo.style.transform = `translateY(${offset}px)`;
    } else {
      parallaxLogo.style.transform = '';
    }
  };

  window.addEventListener('scroll', handleParallax, { passive: true });
  mobileQuery.addEventListener('change', () => {
    if (mobileQuery.matches) {
      parallaxLogo.style.transform = '';
    } else {
      handleParallax();
    }
  });
  handleParallax();
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

/**
 * Update nav active state based on scroll position or current page
 */
function initNavActiveState() {
  const navLinks = document.querySelectorAll('.nav-link');
  const servicesSection = document.getElementById('services');
  const isAboutPage = document.body.classList.contains('about-page') || window.location.pathname.includes('about');

  function setActiveLink(section) {
    navLinks.forEach(link => {
      link.classList.toggle('active', link.getAttribute('data-section') === section);
    });
  }

  if (isAboutPage) {
    setActiveLink('about');
    return;
  }

  // Update active state when nav links are clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      const section = link.getAttribute('data-section');
      if (section && (section === 'home' || section === 'about' || link.getAttribute('href')?.startsWith('#'))) {
        setActiveLink(section);
      }
    });
  });

  if (servicesSection) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveLink('services');
        }
      });
    }, { threshold: 0.3, rootMargin: '-80px 0px -50% 0px' });

    observer.observe(servicesSection);

    const heroSection = document.querySelector('.hero');
    if (heroSection) {
      const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveLink('home');
          }
        });
      }, { threshold: 0.2, rootMargin: '-80px 0px 0px 0px' });
      heroObserver.observe(heroSection);
    }
  } else {
    setActiveLink('home');
  }

  // Initial state based on hash
  if (window.location.hash === '#services' && servicesSection) {
    setActiveLink('services');
  } else if (!isAboutPage && !window.location.hash) {
    setActiveLink('home');
  }
}
