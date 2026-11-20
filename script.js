/**
 * ============================================================================
 * RAMESH VANTHALA - PERSONAL PORTFOLIO JAVASCRIPT
 * Features: Dark/Light Mode, Mobile Nav, ScrollSpy, Typing Effect,
 * Project Filtering, Counter Animation, Form Validation, Back-to-Top, Toast
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --------------------------------------------------------------------------
  // 1. Dark / Light Theme Toggle with LocalStorage
  // --------------------------------------------------------------------------
  const themeToggleBtn = document.getElementById('theme-toggle');
  const body = document.body;

  // Check saved theme or user OS preference
  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;

  if (savedTheme) {
    body.className = savedTheme;
  } else if (!prefersDark) {
    body.className = 'light-theme';
  } else {
    body.className = 'dark-theme';
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      if (body.classList.contains('dark-theme')) {
        body.classList.replace('dark-theme', 'light-theme');
        localStorage.setItem('theme', 'light-theme');
      } else {
        body.classList.replace('light-theme', 'dark-theme');
        localStorage.setItem('theme', 'dark-theme');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 2. Mobile Navigation Toggle & Backdrop Click
  // --------------------------------------------------------------------------
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');

  if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
      const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      menuToggle.classList.toggle('active');
      navMenu.classList.toggle('active');
    });

    // Close mobile nav when clicking any nav link
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
          menuToggle.classList.remove('active');
          navMenu.classList.remove('active');
          menuToggle.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!navMenu.contains(e.target) && !menuToggle.contains(e.target) && navMenu.classList.contains('active')) {
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // --------------------------------------------------------------------------
  // 3. Header Scrolled State & Active Navigation Highlight (ScrollSpy)
  // --------------------------------------------------------------------------
  const header = document.getElementById('header');
  const sections = document.querySelectorAll('section[id]');
  const backToTopBtn = document.getElementById('back-to-top');

  const handleScroll = () => {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;

    // Header background blur on scroll
    if (header) {
      if (scrollY > 50) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    // Back to top button visibility
    if (backToTopBtn) {
      if (scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    }

    // ScrollSpy: highlight active link in navigation
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const activeLink = document.querySelector(`.nav-list a[href*='${sectionId}']`);

      if (activeLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          activeLink.classList.add('active');
        } else {
          activeLink.classList.remove('active');
        }
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // Trigger initial check

  // Back to top click smooth scroll
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // --------------------------------------------------------------------------
  // 4. Typing Text Effect in Hero Section
  // --------------------------------------------------------------------------
  const typingElement = document.getElementById('typing-text');
  if (typingElement) {
    const words = [
      'Full Stack Developer',
      'Software Engineer',
      'Frontend Specialist',
      'Problem Solver',
      'Tech Enthusiast'
    ];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const typeEffect = () => {
      const currentWord = words[wordIndex];

      if (isDeleting) {
        typingElement.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
      } else {
        typingElement.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 110;
      }

      if (!isDeleting && charIndex === currentWord.length) {
        // Pause at the end of word
        isDeleting = true;
        typingSpeed = 1600;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        typingSpeed = 400;
      }

      setTimeout(typeEffect, typingSpeed);
    };

    setTimeout(typeEffect, 600);
  }

  // --------------------------------------------------------------------------
  // 5. Interactive Project Filtering
  // --------------------------------------------------------------------------
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (filterBtns.length > 0 && projectCards.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const filterValue = btn.getAttribute('data-filter');

        projectCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');

          if (filterValue === 'all' || filterValue === cardCategory) {
            card.style.display = 'flex';
            // Trigger quick animation
            card.style.opacity = '0';
            card.style.transform = 'translateY(15px)';
            setTimeout(() => {
              card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, 50);
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // --------------------------------------------------------------------------
  // 6. Animated Counter for Stats
  // --------------------------------------------------------------------------
  const statNumbers = document.querySelectorAll('.stat-number');
  let animatedStats = false;

  const animateStats = () => {
    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'), 10);
      const duration = 1800; // milliseconds
      const startTime = performance.now();

      const updateCount = (currentTime) => {
        const elapsedTime = currentTime - startTime;
        const progress = Math.min(elapsedTime / duration, 1);
        
        // Easing out cubic
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentCount = Math.floor(easeOut * target);

        stat.textContent = currentCount;

        if (progress < 1) {
          requestAnimationFrame(updateCount);
        } else {
          stat.textContent = target;
        }
      };

      requestAnimationFrame(updateCount);
    });
  };

  // Observe when About section enters view to trigger stats
  const aboutSection = document.getElementById('about');
  if (aboutSection && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !animatedStats) {
          animatedStats = true;
          animateStats();
        }
      });
    }, { threshold: 0.3 });

    observer.observe(aboutSection);
  } else {
    // Fallback if IntersectionObserver is unsupported
    animateStats();
  }

  // --------------------------------------------------------------------------
  // 7. Contact Form Live Validation & Toast Feedback
  // --------------------------------------------------------------------------
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast');
  const toastMessage = document.getElementById('toast-message');

  const showToast = (message, isError = false) => {
    if (!toast) return;
    toastMessage.textContent = message;
    
    const toastIcon = toast.querySelector('.toast-icon i');
    if (toastIcon) {
      if (isError) {
        toastIcon.className = 'fa-solid fa-triangle-exclamation';
        toastIcon.style.color = 'var(--rose)';
      } else {
        toastIcon.className = 'fa-solid fa-circle-check';
        toastIcon.style.color = 'var(--emerald)';
      }
    }

    toast.classList.add('show');
    setTimeout(() => {
      toast.classList.remove('show');
    }, 4500);
  };

  if (contactForm) {
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const subjectInput = document.getElementById('subject');
    const messageInput = document.getElementById('message');
    const submitBtn = document.getElementById('submit-btn');

    // Email validation helper
    const isValidEmail = (email) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(email);
    };

    const validateField = (input, condition, errorId) => {
      const group = input.closest('.form-group');
      if (!condition) {
        group.classList.add('has-error');
        return false;
      } else {
        group.classList.remove('has-error');
        return true;
      }
    };

    // Live validation on input
    nameInput.addEventListener('input', () => {
      validateField(nameInput, nameInput.value.trim().length > 0, 'name-error');
    });

    emailInput.addEventListener('input', () => {
      validateField(emailInput, isValidEmail(emailInput.value.trim()), 'email-error');
    });

    subjectInput.addEventListener('input', () => {
      validateField(subjectInput, subjectInput.value.trim().length > 0, 'subject-error');
    });

    messageInput.addEventListener('input', () => {
      validateField(messageInput, messageInput.value.trim().length >= 10, 'message-error');
    });

    // Form submit handler
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const isNameValid = validateField(nameInput, nameInput.value.trim().length > 0, 'name-error');
      const isEmailValid = validateField(emailInput, isValidEmail(emailInput.value.trim()), 'email-error');
      const isSubjectValid = validateField(subjectInput, subjectInput.value.trim().length > 0, 'subject-error');
      const isMessageValid = validateField(messageInput, messageInput.value.trim().length >= 10, 'message-error');

      if (isNameValid && isEmailValid && isSubjectValid && isMessageValid) {
        // Change button state
        const originalBtnHtml = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
          <span>Sending...</span>
          <i class="fa-solid fa-spinner fa-spin"></i>
        `;

        // Simulate network submission delay
        setTimeout(() => {
          submitBtn.disabled = false;
          submitBtn.innerHTML = originalBtnHtml;

          // Display success notification
          showToast(`Thank you, ${nameInput.value.trim()}! Your message has been sent successfully.`);

          // Reset form fields
          contactForm.reset();

          // Clear any remaining error indicators
          document.querySelectorAll('.form-group').forEach(grp => grp.classList.remove('has-error'));
        }, 1200);
      } else {
        showToast('Please fill out all required fields properly.', true);
      }
    });
  }

  // --------------------------------------------------------------------------
  // 8. Auto-update Current Year in Footer
  // --------------------------------------------------------------------------
  const currentYearSpan = document.getElementById('current-year');
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
});
