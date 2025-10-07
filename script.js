// Professional Scroll Animations for Al-Burhan Regional Co.
class ScrollAnimations {
  constructor() {
    this.init();
  }

  init() {
    // Initialize all animations when DOM is loaded
    document.addEventListener("DOMContentLoaded", () => {
      this.initMobileNavigation();
      this.initSmoothScrolling();
      this.initNavbarEffects();
      this.initScrollAnimations();
      this.initContactForm();
      this.initScrollToTop();
      this.initTypingEffect();
      this.initParticles();
      this.initAboutSlider();
      this.initCounterAnimations();
      this.initImageLazyLoading();
      this.initButtonAnimations();
      this.initCardHoverEffects();
    });
  }

  // Mobile Navigation
  initMobileNavigation() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {
      hamburger.addEventListener("click", () => {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        document.body.style.overflow = navMenu.classList.contains("active")
          ? "hidden"
          : "";
      });

      // Close mobile menu when clicking on links
      document.querySelectorAll(".nav-menu a").forEach((link) => {
        link.addEventListener("click", () => {
          hamburger.classList.remove("active");
          navMenu.classList.remove("active");
          document.body.style.overflow = "";
        });
      });

      // Close menu when clicking outside
      document.addEventListener("click", (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
          hamburger.classList.remove("active");
          navMenu.classList.remove("active");
          document.body.style.overflow = "";
        }
      });
    }
  }

  // Smooth Scrolling
  initSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
          const headerHeight = document.querySelector(".navbar").offsetHeight;
          const targetPosition = target.offsetTop - headerHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      });
    });
  }

  // Navbar Effects
  initNavbarEffects() {
    const navbar = document.querySelector(".navbar");
    let lastScrollY = window.scrollY;

    window.addEventListener("scroll", () => {
      const currentScrollY = window.scrollY;

      // Background and shadow effect
      if (currentScrollY > 100) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }

      // Hide/show navbar on scroll
      if (currentScrollY > lastScrollY && currentScrollY > 200) {
        navbar.style.transform = "translateY(-100%)";
      } else {
        navbar.style.transform = "translateY(0)";
      }

      lastScrollY = currentScrollY;
    });
  }

  // Professional Scroll Animations
  initScrollAnimations() {
    // Enhanced Intersection Observer with multiple animation types
    const animationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateElement(entry.target);
            animationObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    // Observe all elements with scroll-animate class
    document.querySelectorAll(".scroll-animate").forEach((element) => {
      animationObserver.observe(element);
    });

    // Special animations for hero section
    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateHeroSection(entry.target);
            heroObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    const heroSection = document.querySelector(".hero");
    if (heroSection) heroObserver.observe(heroSection);
  }

  // Animate individual elements with professional effects
  animateElement(element) {
    element.classList.add("animated");

    // Add special effects based on element type
    if (element.classList.contains("stats")) {
      this.animateStats(element);
    }

    if (element.classList.contains("text-reveal")) {
      this.animateTextReveal(element);
    }

    if (element.classList.contains("gradient-border")) {
      this.animateGradientBorder(element);
    }
  }

  // Hero section animations
  animateHeroSection(heroSection) {
    const title = heroSection.querySelector("h1");
    const subtitle = heroSection.querySelector("p");
    const buttons = heroSection.querySelector(".hero-buttons");

    if (title) {
      title.style.animation =
        "fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards";
      title.style.opacity = "1";
    }

    if (subtitle) {
      subtitle.style.animation =
        "fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.2s forwards";
      subtitle.style.opacity = "1";
    }

    if (buttons) {
      buttons.style.animation =
        "fadeInUp 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.4s forwards";
      buttons.style.opacity = "1";
    }
  }

  // Stats counter animation
  animateStats(statsContainer) {
    const counters = statsContainer.querySelectorAll(".stat h4");

    counters.forEach((counter) => {
      const target = parseInt(counter.textContent.replace("+", ""));
      const duration = 2000; // 2 seconds
      const step = target / (duration / 16); // 60fps
      let current = 0;

      const updateCounter = () => {
        current += step;
        if (current < target) {
          counter.textContent = Math.ceil(current) + "+";
          requestAnimationFrame(updateCounter);
        } else {
          counter.textContent = target + "+";
        }
      };

      updateCounter();
    });
  }

  // Text reveal animation
  animateTextReveal(element) {
    const text = element.querySelector(".reveal-text");
    if (text) {
      text.style.transform = "translateY(0)";
    }
  }

  // Gradient border animation
  animateGradientBorder(element) {
    element.classList.add("animated");
  }

  // Contact Form Handling
  initContactForm() {
    const contactForm = document.querySelector(".contact-form");

    if (contactForm) {
      contactForm.addEventListener("submit", (e) => {
        e.preventDefault();

        // Get form data
        const formData = new FormData(contactForm);
        const name = contactForm.querySelector('input[type="text"]').value;
        const email = contactForm.querySelector('input[type="email"]').value;
        const phone = contactForm.querySelector('input[type="tel"]').value;
        const message = contactForm.querySelector("textarea").value;

        // Validation
        if (!this.validateForm(name, email, message)) {
          return;
        }

        // Show loading state
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML =
          '<i class="fas fa-spinner fa-spin"></i> Sending...';
        submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
          this.showNotification(
            "Thank you for your message! We will get back to you soon.",
            "success"
          );
          contactForm.reset();
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
        }, 2000);
      });

      // Add input animations
      this.initFormAnimations(contactForm);
    }
  }

  // Form validation
  validateForm(name, email, message) {
    if (!name || !email || !message) {
      this.showNotification("Please fill in all required fields.", "error");
      return false;
    }

    if (!this.isValidEmail(email)) {
      this.showNotification("Please enter a valid email address.", "error");
      return false;
    }

    return true;
  }

  // Email validation
  isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  // Form input animations
  initFormAnimations(form) {
    const inputs = form.querySelectorAll("input, textarea");

    inputs.forEach((input) => {
      // Focus effects
      input.addEventListener("focus", () => {
        input.parentElement.classList.add("focused");
      });

      input.addEventListener("blur", () => {
        if (!input.value) {
          input.parentElement.classList.remove("focused");
        }
      });

      // Real-time validation
      input.addEventListener("input", () => {
        this.validateInput(input);
      });
    });
  }

  // Input validation with visual feedback
  validateInput(input) {
    if (input.type === "email" && input.value) {
      if (this.isValidEmail(input.value)) {
        input.style.borderColor = "#27ae60";
      } else {
        input.style.borderColor = "#e74c3c";
      }
    } else {
      input.style.borderColor = "#f39c12";
    }
  }

  // Professional Notification System
  showNotification(message, type = "info") {
    // Remove existing notifications
    const existingNotification = document.querySelector(".notification");
    if (existingNotification) {
      existingNotification.remove();
    }

    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;

    const icons = {
      success: "fa-check-circle",
      error: "fa-exclamation-circle",
      info: "fa-info-circle",
    };

    notification.innerHTML = `
            <div class="notification-content">
                <i class="fas ${icons[type]}"></i>
                <span>${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

    document.body.appendChild(notification);

    // Auto-remove after 5 seconds
    const autoRemove = setTimeout(() => {
      this.removeNotification(notification);
    }, 5000);

    // Close button functionality
    notification
      .querySelector(".notification-close")
      .addEventListener("click", () => {
        clearTimeout(autoRemove);
        this.removeNotification(notification);
      });

    // Add notification styles if not already present
    this.ensureNotificationStyles();
  }

  removeNotification(notification) {
    notification.style.animation = "slideOutRight 0.3s ease-out";
    setTimeout(() => {
      if (notification.parentNode) {
        notification.remove();
      }
    }, 300);
  }

  ensureNotificationStyles() {
    if (!document.querySelector("#notification-styles")) {
      const style = document.createElement("style");
      style.id = "notification-styles";
      style.textContent = `
                @keyframes slideInRight {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes slideOutRight {
                    from { transform: translateX(0); opacity: 1; }
                    to { transform: translateX(100%); opacity: 0; }
                }
            `;
      document.head.appendChild(style);
    }
  }

  // Scroll to Top Functionality
  initScrollToTop() {
    const scrollBtn = document.createElement("button");
    scrollBtn.className = "scroll-to-top";
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.setAttribute("aria-label", "Scroll to top");

    document.body.appendChild(scrollBtn);

    // Show/hide based on scroll position
    window.addEventListener("scroll", () => {
      if (window.pageYOffset > 300) {
        scrollBtn.classList.add("visible");
      } else {
        scrollBtn.classList.remove("visible");
      }
    });

    // Scroll to top functionality
    scrollBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });

    // Hover effects
    scrollBtn.addEventListener("mouseenter", () => {
      scrollBtn.style.transform = "scale(1.1)";
    });

    scrollBtn.addEventListener("mouseleave", () => {
      scrollBtn.style.transform = "scale(1)";
    });
  }

  // Typing Effect for Hero Title
  initTypingEffect() {
    const heroTitle = document.querySelector(".hero h1");
    if (heroTitle) {
      const originalText = heroTitle.textContent;
      heroTitle.textContent = "";
      heroTitle.style.borderRight = "2px solid #f39c12";

      let i = 0;
      const typeWriter = () => {
        if (i < originalText.length) {
          heroTitle.textContent += originalText.charAt(i);
          i++;
          setTimeout(typeWriter, 50);
        } else {
          heroTitle.style.borderRight = "none";
        }
      };

      // Start typing after a short delay
      setTimeout(typeWriter, 1000);
    }
  }

  // Particle Effect for Hero Section
  initParticles() {
    const hero = document.querySelector(".hero");
    if (!hero) return;

    const particleCount = 30;

    for (let i = 0; i < particleCount; i++) {
      this.createParticle(hero);
    }
  }

  createParticle(container) {
    const particle = document.createElement("div");
    particle.className = "particle";

    // Random properties
    const size = Math.random() * 3 + 1;
    const posX = Math.random() * 100;
    const delay = Math.random() * 20;
    const duration = Math.random() * 10 + 15;

    particle.style.cssText = `
            width: ${size}px;
            height: ${size}px;
            left: ${posX}%;
            animation-delay: ${delay}s;
            animation-duration: ${duration}s;
        `;

    container.appendChild(particle);

    // Remove particle after animation completes
    setTimeout(() => {
      if (particle.parentNode) {
        particle.remove();
        // Create new particle to maintain count
        this.createParticle(container);
      }
    }, duration * 1000);
  }

  // About Section Slider
  // About Section Slider - Fixed Version
  initAboutSlider() {
    const slider = document.querySelector(".about-slider");
    if (!slider) return;

    const track = slider.querySelector(".about-slider-track");
    const inner = slider.querySelector(".about-slider-track-inner");
    const slides = Array.from(slider.querySelectorAll(".about-slide"));
    const prevBtn = slider.querySelector(".about-slider-prev");
    const nextBtn = slider.querySelector(".about-slider-next");
    const dotsContainer = slider.querySelector(".about-slider-dots");

    if (slides.length === 0) return;

    let currentIndex = 0;
    let autoPlayInterval;

    // Create inner wrapper if not exists
    if (!inner) {
      const newInner = document.createElement("div");
      newInner.className = "about-slider-track-inner";
      slides.forEach((slide) => newInner.appendChild(slide));
      track.appendChild(newInner);
    }

    // Build dots
    if (dotsContainer) {
      dotsContainer.innerHTML = "";
      slides.forEach((_, index) => {
        const dot = document.createElement("span");
        dot.className = `about-slider-dot ${index === 0 ? "active" : ""}`;
        dot.setAttribute("data-index", index);
        dotsContainer.appendChild(dot);
      });
    }

    // Go to slide function
    const goToSlide = (index, animate = true) => {
      const clampedIndex = Math.max(0, Math.min(index, slides.length - 1));
      currentIndex = clampedIndex;

      const offset = -clampedIndex * 100;

      if (animate) {
        inner.style.transition =
          "transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)";
      } else {
        inner.style.transition = "none";
      }

      inner.style.transform = `translateX(${offset}%)`;

      // Update dots
      if (dotsContainer) {
        dotsContainer
          .querySelectorAll(".about-slider-dot")
          .forEach((dot, i) => {
            dot.classList.toggle("active", i === currentIndex);
          });
      }

      // Lazy load images
      this.lazyLoadSlideImages(currentIndex);
    };

    // Next slide
    const nextSlide = () => {
      const nextIndex = (currentIndex + 1) % slides.length;
      goToSlide(nextIndex);
    };

    // Previous slide
    const prevSlide = () => {
      const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
      goToSlide(prevIndex);
    };

    // Event listeners
    if (nextBtn) nextBtn.addEventListener("click", nextSlide);
    if (prevBtn) prevBtn.addEventListener("click", prevSlide);

    // Dot navigation
    if (dotsContainer) {
      dotsContainer.addEventListener("click", (e) => {
        if (e.target.classList.contains("about-slider-dot")) {
          const index = parseInt(e.target.getAttribute("data-index"));
          goToSlide(index);
        }
      });
    }

    // Auto-play
    const startAutoPlay = () => {
      autoPlayInterval = setInterval(nextSlide, 5000);
    };

    const stopAutoPlay = () => {
      clearInterval(autoPlayInterval);
    };

    // Pause on hover
    slider.addEventListener("mouseenter", stopAutoPlay);
    slider.addEventListener("mouseleave", startAutoPlay);

    // Touch/swipe support for mobile
    let touchStartX = 0;
    let touchEndX = 0;

    track.addEventListener("touchstart", (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoPlay();
    });

    track.addEventListener("touchend", (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
      startAutoPlay();
    });

    const handleSwipe = () => {
      const swipeThreshold = 50;
      const diff = touchStartX - touchEndX;

      if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
          nextSlide(); // Swipe left
        } else {
          prevSlide(); // Swipe right
        }
      }
    };

    // Initialize
    goToSlide(0, false);
    startAutoPlay();

    // Handle resize
    window.addEventListener("resize", () => {
      goToSlide(currentIndex, false);
    });
  }

  // Lazy load images for slider - Fixed
  lazyLoadSlideImages(currentIndex) {
    const slides = document.querySelectorAll(".about-slide");
    const currentSlide = slides[currentIndex];

    if (currentSlide) {
      const img = currentSlide.querySelector("img[data-src]");
      if (img && img.dataset.src && img.src !== img.dataset.src) {
        img.src = img.dataset.src;
        img.classList.remove("lazy");
      }
    }

    // Preload adjacent slides
    const nextIndex = (currentIndex + 1) % slides.length;
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;

    [nextIndex, prevIndex].forEach((index) => {
      const slide = slides[index];
      if (slide) {
        const img = slide.querySelector("img[data-src]");
        if (img && img.dataset.src && !img.src) {
          img.src = img.dataset.src;
        }
      }
    });
  }

  // Lazy load images for slider
  lazyLoadSlideImages(currentIndex) {
    const slides = document.querySelectorAll(".about-slide");
    const currentSlide = slides[currentIndex];

    if (currentSlide) {
      const img = currentSlide.querySelector("img[data-src]");
      if (img && img.dataset.src) {
        img.src = img.dataset.src;
        img.classList.remove("lazy");
      }
    }

    // Preload adjacent slides
    const nextIndex = (currentIndex + 1) % slides.length;
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;

    [nextIndex, prevIndex].forEach((index) => {
      const slide = slides[index];
      if (slide) {
        const img = slide.querySelector("img[data-src]");
        if (img && img.dataset.src && !img.src) {
          img.src = img.dataset.src;
        }
      }
    });
  }

  // Counter Animations for Stats
  initCounterAnimations() {
    const statsObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateStats(entry.target);
            statsObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.5 }
    );

    const statsSection = document.querySelector(".stats");
    if (statsSection) statsObserver.observe(statsSection);
  }

  // Image Lazy Loading
  initImageLazyLoading() {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.classList.remove("lazy");
            imageObserver.unobserve(img);
          }
        }
      });
    });

    document.querySelectorAll("img[data-src]").forEach((img) => {
      imageObserver.observe(img);
    });
  }

  // Button Animations
  initButtonAnimations() {
    document
      .querySelectorAll(".btn-primary, .btn-secondary, .btn-outline")
      .forEach((button) => {
        button.addEventListener("click", function (e) {
          // Don't add loading to navigation links
          if (
            this.getAttribute("href") &&
            this.getAttribute("href").startsWith("#")
          ) {
            return;
          }

          // Ripple effect
          const ripple = document.createElement("span");
          const rect = this.getBoundingClientRect();
          const size = Math.max(rect.width, rect.height);
          const x = e.clientX - rect.left - size / 2;
          const y = e.clientY - rect.top - size / 2;

          ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.6);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    width: ${size}px;
                    height: ${size}px;
                    left: ${x}px;
                    top: ${y}px;
                `;

          this.style.position = "relative";
          this.style.overflow = "hidden";
          this.appendChild(ripple);

          setTimeout(() => {
            ripple.remove();
          }, 600);
        });
      });

    // Add ripple animation styles
    if (!document.querySelector("#ripple-styles")) {
      const style = document.createElement("style");
      style.id = "ripple-styles";
      style.textContent = `
                @keyframes ripple {
                    to {
                        transform: scale(4);
                        opacity: 0;
                    }
                }
            `;
      document.head.appendChild(style);
    }
  }

  // Card Hover Effects
  initCardHoverEffects() {
    const cards = document.querySelectorAll(
      ".brand-card, .shop-card, .category-card, .project-card"
    );

    cards.forEach((card) => {
      card.addEventListener("mouseenter", function () {
        this.style.transform = "translateY(-10px)";
      });

      card.addEventListener("mouseleave", function () {
        this.style.transform = "translateY(0)";
      });
    });
  }
}

// Initialize the scroll animations
new ScrollAnimations();

// Additional utility functions
window.addEventListener("load", () => {
  // Add loaded class to body for any post-load animations
  document.body.classList.add("loaded");

  // Performance monitoring
  if ("performance" in window) {
    const loadTime =
      performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log(`Page loaded in ${loadTime}ms`);
  }
});

// Handle page visibility changes for performance
document.addEventListener("visibilitychange", () => {
  if (document.hidden) {
    // Page is hidden, pause any intensive animations
    document.body.classList.add("page-hidden");
  } else {
    // Page is visible, resume animations
    document.body.classList.remove("page-hidden");
  }
});

// Error handling for images
document.addEventListener(
  "error",
  (e) => {
    if (e.target.tagName === "IMG") {
      e.target.style.display = "none";
      console.warn("Image failed to load:", e.target.src);
    }
  },
  true
);
