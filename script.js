document.addEventListener('DOMContentLoaded', () => {
  const loader = document.getElementById('loader');
  const navbar = document.getElementById('navbar');
  const navLinks = document.getElementById('nav-links');
  const menuToggle = document.getElementById('menu-toggle');
  const backToTop = document.getElementById('back-to-top');
  const themeToggle = document.getElementById('theme-toggle');
  const progressBar = document.getElementById('progress-bar');
  const typewriterElement = document.getElementById('typewriter');
  const sections = document.querySelectorAll('section[id]');
  const words = ['Welcome to MyBrand', 'Innovate Your Future', 'Build. Design. Grow.'];

  // Loader fadeout after page load
  window.addEventListener('load', () => {
    loader.style.opacity = '0';
    setTimeout(() => loader.style.display = 'none', 600);
  });

  // Navbar scroll effect, back-to-top toggle, progress bar update, active nav link highlight
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    navbar.classList.toggle('scrolled', scrollY > 80);
    backToTop.style.display = scrollY > 400 ? 'block' : 'none';

    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = `${(scrollY / docHeight) * 100}%`;

    highlightActiveSection();
  });

  // Mobile menu toggle
  menuToggle.addEventListener('click', () => navLinks.classList.toggle('active'));

  // Close mobile menu on nav link click
  navLinks.querySelectorAll('a').forEach(link =>
    link.addEventListener('click', () => navLinks.classList.remove('active'))
  );

  // Scroll to top on back-to-top button click
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  // Theme toggle function
  const setTheme = (theme) => {
    const isLight = theme === 'light';
    document.documentElement.classList.toggle('light-theme', isLight);
    document.body.classList.toggle('light-theme', isLight);
    themeToggle.textContent = isLight ? '🌙' : '☀️';
    localStorage.setItem('theme', theme);
  };

  // Load saved theme or default to dark
  setTheme(localStorage.getItem('theme') || 'dark');

  // Theme toggle button click handler
  themeToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.classList.contains('light-theme') ? 'light' : 'dark';
    setTheme(currentTheme === 'light' ? 'dark' : 'light');
  });

  // Highlight active nav link based on scroll position
  function highlightActiveSection() {
    const scrollY = window.pageYOffset + 150;
    let currentSectionId = '';

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollY >= top && scrollY < top + height) currentSectionId = section.id;
    });

    navLinks.querySelectorAll('a').forEach(link => {
      link.classList.toggle('active', link.getAttribute('href') === `#${currentSectionId}`);
    });
  }

  // Typewriter effect
  let wordIndex = 0, charIndex = 0, isDeleting = false;
  const typingSpeed = 150, deletingSpeed = 75, delayBetweenWords = 1500;

  function type() {
    const currentWord = words[wordIndex];
    if (isDeleting) {
      charIndex--;
      typewriterElement.textContent = currentWord.substring(0, charIndex);
      if (charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500);
      } else setTimeout(type, deletingSpeed);
    } else {
      charIndex++;
      typewriterElement.textContent = currentWord.substring(0, charIndex);
      if (charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, delayBetweenWords);
      } else setTimeout(type, typingSpeed);
    }
  }

  type();
   const modal = document.getElementById('auth-modal');
  const authTrigger = document.getElementById('auth-trigger');
  const closeBtn = document.getElementById('close-auth-modal');
  const signInBtn = document.getElementById('sign-in-btn');
  const signUpBtn = document.getElementById('sign-up-btn');
  const signInForm = document.getElementById('sign-in-form');
  const signUpForm = document.getElementById('sign-up-form');

  // Open modal
  authTrigger.addEventListener('click', () => {
    modal.style.display = 'flex';
  });

  // Close modal
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Close modal when clicking outside modal content
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Toggle to Sign In form
  signInBtn.addEventListener('click', () => {
    signInBtn.classList.add('active');
    signUpBtn.classList.remove('active');
    signInForm.style.display = 'flex';
    signUpForm.style.display = 'none';
  });

  // Toggle to Sign Up form
  signUpBtn.addEventListener('click', () => {
    signUpBtn.classList.add('active');
    signInBtn.classList.remove('active');
    signUpForm.style.display = 'flex';
    signInForm.style.display = 'none';
  });

  // Optional: Add form submit handlers (prevent default for demo)
  signInForm.addEventListener('submit', e => {
    e.preventDefault();
    alert('Sign In submitted!');
    modal.style.display = 'none';
  });

  signUpForm.addEventListener('submit', e => {
    e.preventDefault();
    alert('Sign Up submitted!');
    modal.style.display = 'none';
  });
});
