// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Navbar background change on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.15)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  }
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("fade-in-up");
    }
  });
}, observerOptions);

// Observe elements for animation
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".brand-card, .shop-card, .category-card, .about-text, .about-image"
  );
  animatedElements.forEach((el) => {
    observer.observe(el);
  });
});

// Contact form handling
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

    // Simple validation
    if (!name || !email || !message) {
      showNotification("Please fill in all required fields.", "error");
      return;
    }

    if (!isValidEmail(email)) {
      showNotification("Please enter a valid email address.", "error");
      return;
    }

    // Simulate form submission
    showNotification(
      "Thank you for your message! We will get back to you soon.",
      "success"
    );
    contactForm.reset();
  });
}

// Email validation function
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${
              type === "success"
                ? "fa-check-circle"
                : type === "error"
                ? "fa-exclamation-circle"
                : "fa-info-circle"
            }"></i>
            <span>${message}</span>
            <button class="notification-close">&times;</button>
        </div>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${
          type === "success"
            ? "#27ae60"
            : type === "error"
            ? "#e74c3c"
            : "#3498db"
        };
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 10000;
        max-width: 400px;
        animation: slideInRight 0.3s ease-out;
    `;

  // Add animation keyframes
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
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .notification-close {
                background: none;
                border: none;
                color: white;
                font-size: 1.2rem;
                cursor: pointer;
                margin-left: auto;
            }
        `;
    document.head.appendChild(style);
  }

  document.body.appendChild(notification);

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = "slideOutRight 0.3s ease-out";
      setTimeout(() => {
        notification.remove();
      }, 300);
    }
  }, 5000);

  // Close button functionality
  notification
    .querySelector(".notification-close")
    .addEventListener("click", () => {
      notification.style.animation = "slideOutRight 0.3s ease-out";
      setTimeout(() => {
        notification.remove();
      }, 300);
    });
}

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const hero = document.querySelector(".hero");
  if (hero) {
    const rate = scrolled * -0.5;
    hero.style.transform = `translateY(${rate}px)`;
  }
});

// Counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll(".stat h4");
  counters.forEach((counter) => {
    const target = parseInt(counter.textContent.replace("+", ""));
    const increment = target / 100;
    let current = 0;

    const updateCounter = () => {
      if (current < target) {
        current += increment;
        counter.textContent = Math.ceil(current) + "+";
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + "+";
      }
    };

    updateCounter();
  });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCounters();
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

const statsSection = document.querySelector(".stats");
if (statsSection) {
  statsObserver.observe(statsSection);
}

// Add loading animation to buttons
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

      const originalText = this.textContent;
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Loading...';
      this.disabled = true;

      // Simulate loading time
      setTimeout(() => {
        this.innerHTML = originalText;
        this.disabled = false;
      }, 2000);
    });
  });

// Add hover effects to cards
document
  .querySelectorAll(".brand-card, .shop-card, .category-card")
  .forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });

// Lazy loading for images (if any are added later)
function lazyLoadImages() {
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach((img) => imageObserver.observe(img));
}

// Initialize lazy loading
document.addEventListener("DOMContentLoaded", lazyLoadImages);

// Add scroll-to-top functionality
function addScrollToTop() {
  const scrollToTopBtn = document.createElement("button");
  scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
  scrollToTopBtn.className = "scroll-to-top";
  scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: #f39c12;
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        font-size: 1.2rem;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
        z-index: 1000;
        opacity: 0;
        transform: translateY(100px);
    `;

  document.body.appendChild(scrollToTopBtn);

  // Show/hide scroll to top button
  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      scrollToTopBtn.style.opacity = "1";
      scrollToTopBtn.style.transform = "translateY(0)";
    } else {
      scrollToTopBtn.style.opacity = "0";
      scrollToTopBtn.style.transform = "translateY(100px)";
    }
  });

  // Scroll to top functionality
  scrollToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  // Hover effects
  scrollToTopBtn.addEventListener("mouseenter", () => {
    scrollToTopBtn.style.background = "#e67e22";
    scrollToTopBtn.style.transform = "translateY(0) scale(1.1)";
  });

  scrollToTopBtn.addEventListener("mouseleave", () => {
    scrollToTopBtn.style.background = "#f39c12";
    scrollToTopBtn.style.transform = "translateY(0) scale(1)";
  });
}

// Initialize scroll to top button
document.addEventListener("DOMContentLoaded", addScrollToTop);

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Initialize typing effect when page loads
document.addEventListener("DOMContentLoaded", () => {
  const heroTitle = document.querySelector(".hero h1");
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 50);
    }, 500);
  }
});

// Add particle effect to hero section
function createParticles() {
  const hero = document.querySelector(".hero");
  if (!hero) return;

  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.cssText = `
            position: absolute;
            width: 2px;
            height: 2px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            animation: float ${Math.random() * 10 + 10}s linear infinite;
        `;

    particle.style.left = Math.random() * 100 + "%";
    particle.style.top = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 10 + "s";

    hero.appendChild(particle);
  }

  // Add particle animation keyframes
  if (!document.querySelector("#particle-styles")) {
    const style = document.createElement("style");
    style.id = "particle-styles";
    style.textContent = `
            @keyframes float {
                0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
                10% { opacity: 1; }
                90% { opacity: 1; }
                100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
            }
        `;
    document.head.appendChild(style);
  }
}

// Initialize particles
document.addEventListener("DOMContentLoaded", createParticles);

// About section vertical slider
function initAboutSlider() {
  const slider = document.querySelector(".about-slider");
  if (!slider) return;

  const track = slider.querySelector(".about-slider-track");
  if (!track) return;

  // Collect slides and create inner wrapper for smooth translate
  const slides = Array.from(track.querySelectorAll(".about-slide"));
  if (slides.length === 0) return;

  let inner = track.querySelector(".about-slider-track-inner");
  if (!inner) {
    inner = document.createElement("div");
    inner.className = "about-slider-track-inner";
    // Move slides into inner
    slides.forEach((slide) => inner.appendChild(slide));
    track.appendChild(inner);
  }

  const prevBtn = slider.querySelector(".about-slider-prev");
  const nextBtn = slider.querySelector(".about-slider-next");
  const dotsContainer = slider.querySelector(".about-slider-dots");

  // Build dots to match slide count
  if (dotsContainer) {
    dotsContainer.innerHTML = "";
    for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement("span");
      dot.className = "about-slider-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("data-index", String(i));
      dotsContainer.appendChild(dot);
    }
  }

  let currentIndex = 0;
  let slideHeight = track.clientHeight;
  let slideWidth = track.clientWidth;

  const isHorizontal = slider.classList.contains("about-slider-horizontal");

  function setSlideSizes() {
    slideHeight = track.clientHeight;
    slideWidth = track.clientWidth;
    slides.forEach((slide) => {
      slide.style.height = slideHeight + "px";
      slide.style.width = slideWidth + "px";
    });
    if (isHorizontal) {
      inner.style.width = slideWidth * slides.length + "px";
      inner.style.height = slideHeight + "px";
      inner.style.display = "flex";
      inner.style.flexDirection = "row";
    } else {
      inner.style.height = slideHeight * slides.length + "px";
    }
    goTo(currentIndex, true);
  }

  function lazyLoadFor(index) {
    const slide = slides[index];
    if (!slide) return;
    const img = slide.querySelector("img[data-src]");
    if (img && img.dataset.src && img.src !== img.dataset.src) {
      img.src = img.dataset.src;
      img.classList.remove("lazy");
    }
  }

  function updateDots() {
    if (!dotsContainer) return;
    dotsContainer.querySelectorAll(".about-slider-dot").forEach((dot, i) => {
      if (i === currentIndex) dot.classList.add("active");
      else dot.classList.remove("active");
    });
  }

  function goTo(index, immediate = false) {
    const clamped = Math.max(0, Math.min(index, slides.length - 1));
    currentIndex = clamped;
    const offset = isHorizontal
      ? -clamped * slideWidth
      : -clamped * slideHeight;
    if (immediate) {
      const original = inner.style.transition;
      inner.style.transition = "none";
      inner.style.transform = isHorizontal
        ? `translateX(${offset}px)`
        : `translateY(${offset}px)`;
      // Force reflow then restore transition
      void inner.offsetHeight;
      inner.style.transition = original || "";
    } else {
      inner.style.transform = isHorizontal
        ? `translateX(${offset}px)`
        : `translateY(${offset}px)`;
    }
    updateDots();
    lazyLoadFor(currentIndex);
    // Optionally, preload neighbors
    lazyLoadFor(currentIndex + 1);
    lazyLoadFor(currentIndex - 1);
  }

  function next() {
    goTo(currentIndex + 1);
  }

  function prev() {
    goTo(currentIndex - 1);
  }

  // Events
  if (nextBtn) nextBtn.addEventListener("click", next);
  if (prevBtn) prevBtn.addEventListener("click", prev);
  if (dotsContainer) {
    dotsContainer.addEventListener("click", (e) => {
      const target = e.target;
      if (target && target.classList.contains("about-slider-dot")) {
        const i = parseInt(target.getAttribute("data-index"));
        if (!isNaN(i)) goTo(i);
      }
    });
  }

  // Resize handling
  window.addEventListener("resize", () => setSlideSizes());

  // Initialize sizes and first slide
  setSlideSizes();
  lazyLoadFor(0);
}

document.addEventListener("DOMContentLoaded", initAboutSlider);
