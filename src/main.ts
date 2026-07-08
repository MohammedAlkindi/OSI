import './styles.css';

const navToggle = document.querySelector<HTMLButtonElement>('.nav-toggle');
const navLinks = document.querySelector<HTMLElement>('#nav-links');
const year = document.querySelector<HTMLElement>('#year');
const header = document.querySelector<HTMLElement>('.site-header');
const canvas = document.querySelector<HTMLCanvasElement>('.starfield');
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

if (year) {
  year.textContent = new Date().getFullYear().toString();
}

if (navToggle && navLinks) {
  const setMenuState = (isOpen: boolean) => {
    navLinks.classList.toggle('open', isOpen);
    navToggle.classList.toggle('open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  };

  navToggle.addEventListener('click', () => {
    setMenuState(!navLinks.classList.contains('open'));
  });

  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => setMenuState(false));
  });
}

const updateHeader = () => {
  header?.classList.toggle('scrolled', window.scrollY > 12);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16, rootMargin: '0px 0px -40px 0px' },
);

document.querySelectorAll<HTMLElement>('.reveal').forEach((element, index) => {
  element.style.setProperty('--reveal-delay', `${Math.min(index * 45, 220)}ms`);
  revealObserver.observe(element);
});

document.querySelectorAll<HTMLElement>('[data-count]').forEach((element) => {
  const target = Number(element.dataset.count ?? 0);
  let started = false;
  const observer = new IntersectionObserver((entries) => {
    const entry = entries[0];
    if (!entry?.isIntersecting || started) return;
    started = true;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / 900, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      element.textContent = Math.round(target * eased).toString();
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
    observer.disconnect();
  });
  observer.observe(element);
});

type Star = {
  x: number;
  y: number;
  z: number;
  speed: number;
  size: number;
};

const runStarfield = (targetCanvas: HTMLCanvasElement) => {
  const context = targetCanvas.getContext('2d');
  if (!context) return;

  let width = 0;
  let height = 0;
  let stars: Star[] = [];
  let animationId = 0;

  const createStar = (): Star => ({
    x: Math.random() * width,
    y: Math.random() * height,
    z: Math.random(),
    speed: 0.18 + Math.random() * 0.44,
    size: 0.8 + Math.random() * 1.9,
  });

  const resize = () => {
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    width = targetCanvas.clientWidth;
    height = targetCanvas.clientHeight;
    targetCanvas.width = Math.floor(width * ratio);
    targetCanvas.height = Math.floor(height * ratio);
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    stars = Array.from({ length: Math.round(Math.min(width, 1200) / 6) }, createStar);
  };

  const draw = () => {
    context.clearRect(0, 0, width, height);

    const gradient = context.createLinearGradient(0, 0, width, height);
    gradient.addColorStop(0, 'rgba(15, 29, 48, 0.72)');
    gradient.addColorStop(0.58, 'rgba(8, 17, 31, 0.34)');
    gradient.addColorStop(1, 'rgba(16, 96, 115, 0.4)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, width, height);

    stars.forEach((star) => {
      star.x += star.speed * (0.4 + star.z);
      star.y -= star.speed * 0.16;
      if (star.x > width + 8 || star.y < -8) {
        Object.assign(star, createStar(), { x: -8, y: Math.random() * height });
      }

      context.beginPath();
      context.fillStyle = `rgba(223, 246, 255, ${0.22 + star.z * 0.58})`;
      context.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      context.fill();
    });

    animationId = requestAnimationFrame(draw);
  };

  resize();
  window.addEventListener('resize', resize);
  draw();

  return () => {
    cancelAnimationFrame(animationId);
    window.removeEventListener('resize', resize);
  };
};

if (canvas && !prefersReducedMotion.matches) {
  runStarfield(canvas);
}
