// Email storage array (placeholder)
let emailList = [];

// DOM elements
const waitlistForm = document.getElementById('waitlist-form');
const emailInput = document.getElementById('email');
const formMessage = document.getElementById('form-message');
const scrollIndicator = document.querySelector('.scroll-indicator');
const waitlistNumber = document.getElementById('waitlist-number');

// Initialize animations and event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Smooth scroll for scroll indicator
  scrollIndicator.addEventListener('click', function() {
    document.getElementById('about').scrollIntoView({
      behavior: 'smooth'
    });
  });

  // Waitlist form submission
  waitlistForm.addEventListener('submit', function(e) {
    e.preventDefault();
    handleWaitlistSubmission();
  });

  // Add scroll-triggered animations
  observeElements();
  
  // Initialize parallax effects
  initParallax();
  
  // Animate waitlist counter
  animateCounter();
});

// Handle waitlist form submission
function handleWaitlistSubmission() {
  const email = emailInput.value.trim();
  
  // Validate email
  if (!isValidEmail(email)) {
    showMessage('Please enter a valid email address, darling! 💋', 'error');
    return;
  }
  
  // Check if email already exists
  if (emailList.includes(email)) {
    showMessage('You\'re already on our exclusive list! 💕', 'error');
    return;
  }
  
  // Add email to list
  emailList.push(email);
  
  // Show success message
  showMessage('✨ Welcome to the ReallyCloset family! We\'ll be in touch soon with something special.', 'success');
  
  // Update counter
  updateWaitlistCounter();
  
  // Clear form
  emailInput.value = '';
  
  // Add celebration animation
  celebrateSignup();
  
  // Log for development (remove in production)
  console.log('Waitlist emails:', emailList);
}

// Email validation
function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Show form message
function showMessage(message, type) {
  formMessage.innerHTML = message;
  formMessage.className = `form-message ${type}`;
  
  // Hide message after 6 seconds
  setTimeout(() => {
    formMessage.style.opacity = '0';
    setTimeout(() => {
      formMessage.className = 'form-message';
    }, 300);
  }, 6000);
}

// Update waitlist counter
function updateWaitlistCounter() {
  const currentCount = parseInt(waitlistNumber.textContent);
  const newCount = currentCount + 1;
  
  // Animate counter update
  animateNumberChange(waitlistNumber, currentCount, newCount);
}

// Animate number change
function animateNumberChange(element, from, to) {
  const duration = 1000;
  const steps = 20;
  const increment = (to - from) / steps;
  let current = from;
  let step = 0;
  
  const timer = setInterval(() => {
    step++;
    current += increment;
    element.textContent = Math.round(current);
    
    if (step >= steps) {
      clearInterval(timer);
      element.textContent = to;
    }
  }, duration / steps);
}

// Celebration animation
function celebrateSignup() {
  // Create floating hearts
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      createFloatingHeart();
    }, i * 200);
  }
}

// Create floating heart animation
function createFloatingHeart() {
  const heart = document.createElement('div');
  heart.innerHTML = '💕';
  heart.style.position = 'fixed';
  heart.style.fontSize = '2rem';
  heart.style.pointerEvents = 'none';
  heart.style.zIndex = '1000';
  heart.style.left = Math.random() * window.innerWidth + 'px';
  heart.style.top = window.innerHeight + 'px';
  heart.style.animation = 'floatUp 3s ease-out forwards';
  
  document.body.appendChild(heart);
  
  // Remove heart after animation
  setTimeout(() => {
    heart.remove();
  }, 3000);
}

// Add floating heart animation CSS
const style = document.createElement('style');
style.textContent = `
  @keyframes floatUp {
    0% {
      transform: translateY(0) rotate(0deg);
      opacity: 1;
    }
    100% {
      transform: translateY(-100vh) rotate(360deg);
      opacity: 0;
    }
  }
`;
document.head.appendChild(style);

// Intersection Observer for scroll animations
function observeElements() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
        
        // Add stagger effect for feature highlights
        if (entry.target.classList.contains('feature-highlight')) {
          const highlights = entry.target.parentElement.querySelectorAll('.feature-highlight');
          highlights.forEach((highlight, index) => {
            setTimeout(() => {
              highlight.style.opacity = '1';
              highlight.style.transform = 'translateY(0) scale(1)';
            }, index * 200);
          });
        }
      }
    });
  }, observerOptions);

  // Observe sections for fade-in animation
  const sections = document.querySelectorAll('section:not(#hero)');
  sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
    observer.observe(section);
  });
  
  // Observe feature highlights
  const highlights = document.querySelectorAll('.feature-highlight');
  highlights.forEach(highlight => {
    highlight.style.opacity = '0';
    highlight.style.transform = 'translateY(20px) scale(0.95)';
    highlight.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(highlight);
  });
}

// Initialize parallax effects
function initParallax() {
  window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.cloud-texture, .decorative-elements');
    
    parallaxElements.forEach(element => {
      const speed = 0.5;
      element.style.transform = `translateY(${scrolled * speed}px)`;
    });
  });
}

// Animate counter on load
function animateCounter() {
  setTimeout(() => {
    animateNumberChange(waitlistNumber, 0, 247);
  }, 2000);
}

// Add hover effects for interactive elements
document.addEventListener('DOMContentLoaded', function() {
  // Add ripple effect to buttons
  const buttons = document.querySelectorAll('.submit-btn, .careers-btn');
  buttons.forEach(button => {
    button.addEventListener('click', function(e) {
      const ripple = document.createElement('span');
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;
      
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';
      ripple.classList.add('ripple');
      
      this.appendChild(ripple);
      
      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });
});

// Add ripple effect CSS
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  .ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.6);
    transform: scale(0);
    animation: rippleEffect 0.6s linear;
    pointer-events: none;
  }
  
  @keyframes rippleEffect {
    to {
      transform: scale(4);
      opacity: 0;
    }
  }
`;
document.head.appendChild(rippleStyle);

// Smooth scrolling for any future navigation links
function smoothScroll(targetId) {
  const target = document.getElementById(targetId);
  if (target) {
    target.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
  if (e.key === 'Enter' && e.target === emailInput) {
    handleWaitlistSubmission();
  }
});

// Add mouse trail effect for desktop
let mouseTrail = [];
document.addEventListener('mousemove', function(e) {
  if (window.innerWidth > 768) {
    mouseTrail.push({x: e.clientX, y: e.clientY, time: Date.now()});
    
    // Limit trail length
    if (mouseTrail.length > 10) {
      mouseTrail.shift();
    }
    
    // Create subtle trail effect
    if (Math.random() < 0.1) {
      createTrailParticle(e.clientX, e.clientY);
    }
  }
});

function createTrailParticle(x, y) {
  const particle = document.createElement('div');
  particle.style.position = 'fixed';
  particle.style.left = x + 'px';
  particle.style.top = y + 'px';
  particle.style.width = '4px';
  particle.style.height = '4px';
  particle.style.background = '#F4CFCF';
  particle.style.borderRadius = '50%';
  particle.style.pointerEvents = 'none';
  particle.style.zIndex = '999';
  particle.style.animation = 'fadeOut 1s ease-out forwards';
  
  document.body.appendChild(particle);
  
  setTimeout(() => {
    particle.remove();
  }, 1000);
}

// Add fadeOut animation for trail particles
const trailStyle = document.createElement('style');
trailStyle.textContent = `
  @keyframes fadeOut {
    0% {
      opacity: 0.8;
      transform: scale(1);
    }
    100% {
      opacity: 0;
      transform: scale(0);
    }
  }
`;
document.head.appendChild(trailStyle);
