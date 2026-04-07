/* ═══════════════════════════════════════════
   HHWSDC — Main JavaScript
   ═══════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ─── NAVBAR SCROLL ─── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  /* ─── HAMBURGER MENU ─── */
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.setAttribute('aria-expanded',
      navLinks.classList.contains('open') ? 'true' : 'false'
    );
  });

  // Close on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });

  /* ─── SCROLL REVEAL ─── */
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
  );

  document.querySelectorAll('.reveal').forEach(el => {
    revealObserver.observe(el);
  });

  /* ─── COUNTER ANIMATION ─── */
  function animateCounter(el, target, suffix) {
    const duration = 2000;
    const start = performance.now();
    const isDecimal = target % 1 !== 0;

    const step = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 4); // ease out quart
      const current = isDecimal
        ? (ease * target).toFixed(1)
        : Math.floor(ease * target).toLocaleString('ko-KR');

      el.textContent = current + (suffix || '');
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }

  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.dataset.target);
          const suffix = el.dataset.suffix || '';
          animateCounter(el, target, suffix);
          counterObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('[data-target]').forEach(el => {
    counterObserver.observe(el);
  });

  /* ─── ACTIVE NAV LINK ─── */
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a[href^="#"]');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { threshold: 0.35 }
  );

  sections.forEach(s => sectionObserver.observe(s));

  /* ─── SMOOTH SCROLL ─── */
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ─── CONTACT FORM ─── */
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.textContent;

      btn.textContent = '✅ 제출 완료! 감사합니다';
      btn.style.background = '#16a34a';
      btn.disabled = true;

      setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    });
  }

  /* ─── HERO PARALLAX ─── */
  window.addEventListener('scroll', () => {
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      const scrollY = window.scrollY;
      heroContent.style.transform = `translateY(${scrollY * 0.2}px)`;
      heroContent.style.opacity = Math.max(0, 1 - scrollY / 600);
    }
  }, { passive: true });

  /* ─── PROGRESS BARS ANIMATION ─── */
  const barObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.bar-fill, .score-fill').forEach(bar => {
            const width = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => { bar.style.width = width; }, 100);
          });
          barObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll('.reason-card').forEach(card => {
    barObserver.observe(card);
  });

  /* ─── DYNAMIC YEAR ─── */
  document.querySelectorAll('.current-year').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  console.log('🛫 HHWSDC — 화성화옹지구 서부발전협의회 웹사이트 로드 완료');
});
