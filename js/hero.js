/* ============================================================
   SAKSHI KUMARI PORTFOLIO — Hero & Core JavaScript
   Features: Particles, Cursor, Typing, Parallax, Magnetic,
             Ripple, Mobile Nav, Scroll Reveal, Back-to-Top
   ============================================================ */

'use strict';

// ============================================================
//  1. PARTICLE SYSTEM (Canvas-based)
// ============================================================
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  let particles = [];
  let animFrameId;
  let W, H;

  function resize() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  class Particle {
    constructor() { this.reset(true); }

    reset(initial = false) {
      this.x  = Math.random() * W;
      this.y  = initial ? Math.random() * H : H + 10;
      this.r  = Math.random() * 1.5 + 0.3;
      this.vx = (Math.random() - 0.5) * 0.4;
      this.vy = -(Math.random() * 0.6 + 0.2);
      this.life   = 0;
      this.maxLife = Math.random() * 200 + 100;
      this.color = ['168,85,247', '6,182,212', '236,72,153'][
        Math.floor(Math.random() * 3)
      ];
    }

    update() {
      this.x += this.vx;
      this.y += this.vy;
      this.life++;
      if (this.life > this.maxLife || this.y < -10) this.reset();
    }

    draw() {
      const alpha = Math.sin((this.life / this.maxLife) * Math.PI) * 0.6;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${this.color},${alpha})`;
      ctx.fill();
    }
  }

  function createParticles(n = 80) {
    particles = [];
    for (let i = 0; i < n; i++) particles.push(new Particle());
  }

  function loop() {
    ctx.clearRect(0, 0, W, H);

    // Draw connection lines between nearby particles
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 100) {
          const alpha = (1 - dist / 100) * 0.12;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(168,85,247,${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }

    particles.forEach(p => { p.update(); p.draw(); });
    animFrameId = requestAnimationFrame(loop);
  }

  function init() {
    resize();
    createParticles(70);
    loop();
  }

  window.addEventListener('resize', () => {
    resize();
  });

  // Pause when tab not visible for performance
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
      cancelAnimationFrame(animFrameId);
    } else {
      loop();
    }
  });

  init();
}

// ============================================================
//  2. CUSTOM CURSOR
// ============================================================
function initCustomCursor() {
  const dot  = document.getElementById('cursor-dot');
  const ring = document.getElementById('cursor-ring');

  if (!dot || !ring) return;

  // Only on pointer devices
  if (!window.matchMedia('(hover: hover)').matches) {
    dot.style.display = ring.style.display = 'none';
    return;
  }

  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;

    dot.style.left  = mouseX + 'px';
    dot.style.top   = mouseY + 'px';
  });

  function animateRing() {
    ringX += (mouseX - ringX) * 0.1;
    ringY += (mouseY - ringY) * 0.1;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  }

  animateRing();

  // Expand on interactive elements
  document.querySelectorAll('a, button, .social-btn, .stat-card, .ws-tool, .ws-swatch').forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.style.transform  = 'translate(-50%,-50%) scale(1.5)';
      ring.style.transform = 'translate(-50%,-50%) scale(1.4)';
      ring.style.borderColor = 'rgba(168,85,247,0.8)';
    });
    el.addEventListener('mouseleave', () => {
      dot.style.transform  = 'translate(-50%,-50%) scale(1)';
      ring.style.transform = 'translate(-50%,-50%) scale(1)';
      ring.style.borderColor = 'rgba(168,85,247,0.5)';
    });
  });
}

// ============================================================
//  3. HEADER SCROLL EFFECT
// ============================================================
function initHeaderScroll() {
  const header = document.getElementById('header');
  if (!header) return;

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll(); // Run once on load
}

// ============================================================
//  4. MOBILE NAVIGATION — Full-screen overlay
// ============================================================
function initMobileNav() {
  const hamburger   = document.getElementById('menu-toggle');
  const overlay     = document.getElementById('mobile-menu');
  const closeBtn    = document.getElementById('mobile-close');
  if (!hamburger || !overlay) return;

  function openMenu() {
    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Close navigation menu');
    document.body.style.overflow = 'hidden';

    // Focus the close button for keyboard accessibility
    if (closeBtn) {
      setTimeout(() => closeBtn.focus(), 50);
    }
  }

  function closeMenu() {
    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    hamburger.classList.remove('is-open');
    hamburger.setAttribute('aria-expanded', 'false');
    hamburger.setAttribute('aria-label', 'Open navigation menu');
    document.body.style.overflow = '';
    hamburger.focus();
  }

  hamburger.addEventListener('click', () => {
    const isOpen = overlay.classList.contains('is-open');
    isOpen ? closeMenu() : openMenu();
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', closeMenu);
  }

  // Close on mobile nav link click
  overlay.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && overlay.classList.contains('is-open')) {
      closeMenu();
    }
  });
}

// ============================================================
//  5. ACTIVE NAV HIGHLIGHTING (Scroll Spy)
// ============================================================
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  // Track both desktop nav links and mobile nav links
  const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link[data-section]');
  if (!sections.length || !navLinks.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.id;
        navLinks.forEach(link => {
          const match = link.getAttribute('href') === `#${id}`;
          link.classList.toggle('active', match);
        });
      }
    });
  }, {
    rootMargin: '-30% 0px -60% 0px',
    threshold: 0
  });

  sections.forEach(section => observer.observe(section));
}

// ============================================================
//  6. HERO TYPING ANIMATION
// ============================================================
function initTypingAnimation() {
  const el = document.getElementById('hero-typing');
  if (!el) return;

  const phrases = [
    'Graphic Designer',
    'UI/UX Designer',
    'Visual Creator',
    'Brand Strategist',
    'Creative Thinker'
  ];

  let phraseIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;
  let timeoutId;

  const TYPE_SPEED   = 80;
  const DELETE_SPEED = 45;
  const PAUSE_AFTER  = 2200;
  const PAUSE_BEFORE = 400;

  function type() {
    const current = phrases[phraseIndex];

    if (isDeleting) {
      el.textContent = current.slice(0, --charIndex);
    } else {
      el.textContent = current.slice(0, ++charIndex);
    }

    let delay = isDeleting ? DELETE_SPEED : TYPE_SPEED;

    if (!isDeleting && charIndex === current.length) {
      // Pause at end of word
      isDeleting = true;
      delay = PAUSE_AFTER;
    } else if (isDeleting && charIndex === 0) {
      // Move to next phrase
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = PAUSE_BEFORE;
    }

    timeoutId = setTimeout(type, delay);
  }

  // Start with a small delay for page load feel
  setTimeout(type, 800);
}

// ============================================================
//  7. HERO FADE-UP ON LOAD
// ============================================================
function initHeroFadeUp() {
  const fadeEls = document.querySelectorAll('.fade-up');
  if (!fadeEls.length) return;

  // Animate on next frame to allow CSS to be applied first
  requestAnimationFrame(() => {
    fadeEls.forEach(el => {
      setTimeout(() => {
        el.classList.add('animated');
      }, (parseFloat(getComputedStyle(el).getPropertyValue('--delay')) || 0) * 1000);
    });
  });
}

// ============================================================
//  8. SCROLL REVEAL ANIMATIONS
// ============================================================
function initScrollReveal() {
  const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-up');
  if (!revealEls.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target); // Fire once
      }
    });
  }, {
    rootMargin: '0px 0px -8% 0px',
    threshold: 0.1
  });

  revealEls.forEach(el => observer.observe(el));
}

// ============================================================
//  9. MOUSE PARALLAX EFFECT (Hero Visual)
// ============================================================
function initParallax() {
  const layers = document.querySelectorAll('.parallax-layer');
  if (!layers.length) return;

  let targetX = 0, targetY = 0;
  let currentX = 0, currentY = 0;
  let rafId;

  document.addEventListener('mousemove', e => {
    // Normalize to -1..1
    targetX = (e.clientX / window.innerWidth  - 0.5) * 2;
    targetY = (e.clientY / window.innerHeight - 0.5) * 2;
  });

  // On touch/mobile, gentle tilt via DeviceOrientation
  if ('DeviceOrientationEvent' in window) {
    window.addEventListener('deviceorientation', e => {
      if (e.gamma !== null && e.beta !== null) {
        targetX = Math.max(-1, Math.min(1, e.gamma / 30));
        targetY = Math.max(-1, Math.min(1, (e.beta - 20) / 30));
      }
    });
  }

  function animate() {
    currentX += (targetX - currentX) * 0.06;
    currentY += (targetY - currentY) * 0.06;

    layers.forEach(layer => {
      const speed = parseFloat(layer.dataset.speed) || 0.03;
      const x = currentX * speed * 60;
      const y = currentY * speed * 60;
      layer.style.transform = `translate(${x}px, ${y}px)`;

      // Override float animation on workspace card during parallax interaction
      if (layer.classList.contains('workspace-card')) {
        layer.style.animation = 'none';
        layer.style.transform = `translate(${x}px, ${y}px) rotate(${currentX * 0.5}deg)`;
      }
    });

    rafId = requestAnimationFrame(animate);
  }

  animate();
}

// ============================================================
//  10. MAGNETIC BUTTON EFFECT
// ============================================================
function initMagneticButtons() {
  const magnets = document.querySelectorAll('.magnetic-btn');

  magnets.forEach(btn => {
    const strength = 0.35;

    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width  / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      btn.style.transform = `translate(${dx}px, ${dy}px) scale(1.04)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transition = 'transform 0.5s cubic-bezier(0.34,1.56,0.64,1)';
      btn.style.transform  = '';
      setTimeout(() => btn.style.transition = '', 500);
    });

    btn.addEventListener('mouseenter', () => {
      btn.style.transition = 'transform 0.15s ease';
    });
  });
}

// ============================================================
//  11. RIPPLE CLICK EFFECT
// ============================================================
function initRippleEffect() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const ripple = this.querySelector('.btn-ripple');
      if (!ripple) return;

      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top  - size / 2;

      ripple.style.cssText = `
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        animation: rippleAnim 0.7s ease-out forwards;
      `;

      // Reset animation
      ripple.addEventListener('animationend', () => {
        ripple.style.animation = 'none';
      }, { once: true });
    });
  });
}

// ============================================================
//  12. BACK TO TOP BUTTON
// ============================================================
function initBackToTop() {
  const btn = document.getElementById('back-to-top');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('show', window.scrollY > 600);
  }, { passive: true });

  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// ============================================================
//  13. WORKSPACE CARD ANIMATION ENHANCEMENTS
//      (Colour swatch hover glow, tool tooltip, UI pulse)
// ============================================================
function initWorkspaceInteractions() {
  // Tool hover tooltips
  document.querySelectorAll('.ws-tool').forEach(tool => {
    const name = tool.dataset.tool;
    if (!name) return;

    const tip = document.createElement('div');
    tip.textContent = name;
    tip.style.cssText = `
      position:absolute; bottom:calc(100% + 6px); left:50%;
      transform:translateX(-50%);
      background:rgba(12,10,22,0.95);
      border:1px solid rgba(255,255,255,0.1);
      border-radius:6px;
      padding:4px 10px;
      font-family:var(--font-heading);
      font-size:11px; font-weight:700;
      color:var(--text-main);
      white-space:nowrap;
      opacity:0;
      pointer-events:none;
      transition:opacity 0.2s ease, transform 0.2s ease;
      z-index:99;
    `;
    tool.style.position = 'relative';
    tool.appendChild(tip);

    tool.addEventListener('mouseenter', () => {
      tip.style.opacity = '1';
      tip.style.transform = 'translateX(-50%) translateY(-2px)';
    });
    tool.addEventListener('mouseleave', () => {
      tip.style.opacity = '0';
      tip.style.transform = 'translateX(-50%)';
    });
  });

  // Swatch pulse on hover
  document.querySelectorAll('.ws-swatch').forEach(sw => {
    sw.addEventListener('mouseenter', () => {
      sw.style.boxShadow = `0 0 14px ${sw.style.background}`;
    });
    sw.addEventListener('mouseleave', () => {
      sw.style.boxShadow = '';
    });
  });

  // Animated shimmer on hero img block
  const heroBg = document.querySelector('.ws-hero-img-inner');
  if (heroBg) {
    setInterval(() => {
      heroBg.style.background = [
        'linear-gradient(135deg, rgba(168,85,247,0.6) 0%, rgba(6,182,212,0.4) 100%)',
        'linear-gradient(135deg, rgba(6,182,212,0.6) 0%, rgba(236,72,153,0.4) 100%)',
        'linear-gradient(135deg, rgba(236,72,153,0.6) 0%, rgba(168,85,247,0.4) 100%)'
      ][Math.floor(Math.random() * 3)];
    }, 3000);
  }
}

// ============================================================
//  14. STAT CARD NUMBER COUNT-UP ANIMATION
// ============================================================
function initStatCountUp() {
  const statNums = document.querySelectorAll('.stat-number');
  if (!statNums.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;

      // Extract the numeric part
      const raw = el.textContent.replace(/[^0-9]/g, '');
      const target = parseInt(raw, 10);
      if (!target) return;

      const sup = el.querySelector('sup');
      const supText = sup ? sup.textContent : '';

      let current = 0;
      const duration = 1500;
      const step = duration / target;

      // Preserve the sup element
      const updateDisplay = (val) => {
        el.textContent = val;
        if (sup) {
          const newSup = document.createElement('sup');
          newSup.textContent = supText;
          el.appendChild(newSup);
        }
      };

      const timer = setInterval(() => {
        current = Math.min(current + Math.ceil(target / 40), target);
        updateDisplay(current);
        if (current >= target) clearInterval(timer);
      }, step);

      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => observer.observe(el));
}

// ============================================================
//  15. GLOWING BORDER EFFECT ON WORKSPACE CARD
// ============================================================
function initWorkspaceGlow() {
  const card = document.querySelector('.workspace-card');
  if (!card) return;

  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
    const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);

    card.style.setProperty('--mx', `${x}%`);
    card.style.setProperty('--my', `${y}%`);
    card.style.background = `
      radial-gradient(circle at ${x}% ${y}%,
        rgba(168,85,247,0.08) 0%,
        rgba(18,15,35,0.5) 50%)
    `;
    card.style.borderColor = 'rgba(168,85,247,0.25)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.background  = '';
    card.style.borderColor = '';
  });
}

// ============================================================
//  16. SMOOTH SCROLL FOR ANCHOR LINKS
// ============================================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id = link.getAttribute('href').slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

// ============================================================
//  17. WORKSPACE CARD — BUILD BOTTOM ROW IN HTML
//      (wrap tablet + palette + tools + sticky in a .ws-bottom-row)
// ============================================================
function buildWorkspaceLayout() {
  const card = document.querySelector('.workspace-card');
  if (!card) return;

  const tablet = card.querySelector('.ws-tablet');
  const palette = card.querySelector('.ws-palette');
  const tools = card.querySelector('.ws-tools');
  const sticky = card.querySelector('.ws-sticky');

  if (!tablet || !palette || !tools || !sticky) return;

  const row = document.createElement('div');
  row.className = 'ws-bottom-row';
  row.style.cssText = 'display:flex; gap:12px; align-items:flex-start; flex-wrap:wrap;';

  // Re-arrange elements into the row
  const wrapper1 = document.createElement('div');
  wrapper1.style.cssText = 'display:flex; flex-direction:column; gap:12px;';
  wrapper1.appendChild(tablet);
  wrapper1.appendChild(tools);

  const wrapper2 = document.createElement('div');
  wrapper2.style.cssText = 'display:flex; flex-direction:column; gap:12px; flex:1;';
  wrapper2.appendChild(palette);
  wrapper2.appendChild(sticky);

  row.appendChild(wrapper1);
  row.appendChild(wrapper2);

  card.appendChild(row);
}

// ============================================================
//  18. SCROLL-TRIGGERED PROGRESS INDICATOR (Top bar)
// ============================================================
function initScrollProgress() {
  const bar = document.createElement('div');
  bar.id = 'scroll-progress';
  bar.style.cssText = `
    position:fixed; top:0; left:0; height:2px; width:0%;
    background: linear-gradient(90deg, #a855f7, #06b6d4, #ec4899);
    z-index:1001;
    transition:width 0.1s linear;
    box-shadow:0 0 10px rgba(168,85,247,0.5);
  `;
  document.body.prepend(bar);

  window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    bar.style.width = Math.min(scrolled, 100) + '%';
  }, { passive: true });
}

// ============================================================
//  19. ABOUT — STAT COUNTER ANIMATION
// ============================================================
function initAboutCounters() {
  const counters = document.querySelectorAll('.asc-num[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el     = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';

      // Easing function
      const ease = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

      const duration = target > 100 ? 2000 : 1200;
      const startTime = performance.now();

      function update(now) {
        const elapsed  = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased    = ease(progress);
        const current  = Math.round(eased * target);

        el.textContent = current + suffix;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = target + suffix;
        }
      }

      requestAnimationFrame(update);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

// ============================================================
//  20. ABOUT — SMOOTH CARD TILT ON MOUSE MOVE
// ============================================================
function initCardTilt() {
  const cards = document.querySelectorAll('.about-value-card, .about-phil-card, .about-stat-card');

  cards.forEach(card => {
    const MAX_TILT = 8; // degrees

    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const cx     = rect.left + rect.width  / 2;
      const cy     = rect.top  + rect.height / 2;
      const dx     = (e.clientX - cx) / (rect.width  / 2);
      const dy     = (e.clientY - cy) / (rect.height / 2);

      const rotateY =  dx * MAX_TILT;
      const rotateX = -dy * MAX_TILT;

      card.style.transition = 'transform 0.1s ease';
      card.style.transform  = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(6px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
      card.style.transform  = '';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease';
    });
  });
}

// ============================================================
//  21. ABOUT — ILLUSTRATION PARALLAX (section-scoped)
// ============================================================
function initAboutParallax() {
  const wrap   = document.querySelector('.about-illustration-wrap');
  const layers = document.querySelectorAll('.about-illustration-wrap .parallax-layer');
  if (!wrap || !layers.length) return;

  wrap.addEventListener('mousemove', e => {
    const rect = wrap.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;
    const nx   = (e.clientX - cx) / (rect.width  / 2); // -1..1
    const ny   = (e.clientY - cy) / (rect.height / 2);

    layers.forEach(layer => {
      const speed = parseFloat(layer.dataset.speed) || 0.03;
      const x = nx * speed * 40;
      const y = ny * speed * 40;
      layer.style.transform = `translate(${x}px, ${y}px)`;
      layer.style.transition = 'transform 0.18s ease';
    });
  });

  wrap.addEventListener('mouseleave', () => {
    layers.forEach(layer => {
      layer.style.transform  = '';
      layer.style.transition = 'transform 0.6s cubic-bezier(0.16,1,0.3,1)';
    });
  });
}

// ============================================================
//  22. ABOUT — ILLUSTRATION GLOW FOLLOW
// ============================================================
function initAboutIllustrationGlow() {
  const card = document.querySelector('.ab-main-card');
  if (!card) return;

  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
    const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);

    card.style.background = `
      radial-gradient(circle at ${x}% ${y}%,
        rgba(168,85,247,0.1) 0%,
        rgba(18,15,35,0.5) 55%)
    `;
    card.style.borderColor = 'rgba(168,85,247,0.3)';
  });

  card.addEventListener('mouseleave', () => {
    card.style.background  = '';
    card.style.borderColor = '';
  });
}

// ============================================================
//  23. ABOUT — TEXT REVEAL ANIMATION (word-by-word)
// ============================================================
function initAboutTextReveal() {
  const headline = document.querySelector('.about-headline');
  if (!headline) return;

  let wordIndex = 0;

  function wrapTextNodes(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = node.textContent;
      const parts = text.split(/(\s+)/);
      const fragment = document.createDocumentFragment();

      parts.forEach(part => {
        if (part.trim()) {
          const span = document.createElement('span');
          span.className = 'word-reveal';
          span.style.setProperty('--wi', wordIndex++);
          span.textContent = part;
          fragment.appendChild(span);
        } else {
          fragment.appendChild(document.createTextNode(part));
        }
      });

      node.parentNode.replaceChild(fragment, node);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.classList.contains('word-reveal')) return;
      const children = Array.from(node.childNodes);
      children.forEach(child => wrapTextNodes(child));
    }
  }

  wrapTextNodes(headline);

  // Inject one-time styles
  if (!document.getElementById('word-reveal-style')) {
    const style = document.createElement('style');
    style.id = 'word-reveal-style';
    style.textContent = `
      .word-reveal {
        display: inline-block;
        opacity: 0;
        transform: translateY(20px);
        transition: opacity 0.5s ease calc(var(--wi, 0) * 0.06s),
                    transform 0.5s cubic-bezier(0.16,1,0.3,1) calc(var(--wi, 0) * 0.06s);
      }
      .about-headline.text-revealed .word-reveal {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        headline.classList.add('text-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(headline);
}

// ============================================================
//  24. ABOUT — SOFT BACKGROUND BLUR SHIFT ON SCROLL
// ============================================================
function initAboutBgBlur() {
  const section = document.querySelector('.about-section');
  if (!section) return;

  const geoShapes = section.querySelectorAll('.about-geo');

  window.addEventListener('scroll', () => {
    const rect    = section.getBoundingClientRect();
    const visible = Math.max(0, Math.min(1, 1 - (rect.top / window.innerHeight)));

    geoShapes.forEach((geo, i) => {
      const shift = visible * (i % 2 === 0 ? 15 : -10);
      geo.style.transform = `translate(${shift}px, ${shift * 0.5}px)`;
    });
  }, { passive: true });
}

// ============================================================
//  25. ABOUT — SPEC ITEMS STAGGER REVEAL
// ============================================================
function initSpecItemsReveal() {
  const specItems = document.querySelectorAll('.about-spec-item');
  if (!specItems.length) return;

  if (!document.getElementById('spec-reveal-style')) {
    const style = document.createElement('style');
    style.id = 'spec-reveal-style';
    style.textContent = `
      .about-spec-item {
        opacity: 0;
        transform: translateX(-16px);
        transition: opacity 0.5s ease var(--si-delay, 0s),
                    transform 0.5s cubic-bezier(0.16,1,0.3,1) var(--si-delay, 0s);
      }
      .about-spec-item.spec-revealed {
        opacity: 1;
        transform: translateX(0);
      }
    `;
    document.head.appendChild(style);
  }

  specItems.forEach((item, i) => {
    item.style.setProperty('--si-delay', `${i * 0.08}s`);
  });

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('spec-revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  specItems.forEach(item => observer.observe(item));
}

// ============================================================
//  26. ABOUT — STAT CARD STAGGERED REVEAL
// ============================================================
function initAboutStatReveal() {
  const statCards = document.querySelectorAll('.about-stat-card');
  if (!statCards.length) return;

  if (!document.getElementById('stat-reveal-style')) {
    const style = document.createElement('style');
    style.id = 'stat-reveal-style';
    style.textContent = `
      .about-stat-card {
        opacity: 0;
        transform: translateY(30px);
        transition: opacity 0.6s var(--ease-smooth) var(--reveal-delay, 0s),
                    transform 0.6s var(--ease-smooth) var(--reveal-delay, 0s),
                    border-color 0.4s ease,
                    box-shadow 0.4s ease,
                    background 0.4s ease;
      }
      .about-stat-card.stat-visible {
        opacity: 1;
        transform: translateY(0);
      }
    `;
    document.head.appendChild(style);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('stat-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  statCards.forEach(card => observer.observe(card));
}

// ============================================================
//  27. ABOUT — VALUE CARD STAGGERED REVEAL
// ============================================================
function initAboutValueReveal() {
  const valueCards = document.querySelectorAll('.about-value-card');
  if (!valueCards.length) return;

  if (!document.getElementById('value-reveal-style')) {
    const style = document.createElement('style');
    style.id = 'value-reveal-style';
    style.textContent = `
      .about-value-card {
        opacity: 0;
        transform: translateY(40px) scale(0.97);
        transition: opacity 0.65s var(--ease-smooth) var(--reveal-delay, 0s),
                    transform 0.65s var(--ease-smooth) var(--reveal-delay, 0s),
                    border-color 0.4s ease,
                    box-shadow 0.4s ease;
      }
      .about-value-card.value-visible {
        opacity: 1;
        transform: translateY(0) scale(1);
      }
      .about-value-card.value-visible:hover {
        transform: translateY(-10px) scale(1.02);
      }
    `;
    document.head.appendChild(style);
  }

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('value-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  valueCards.forEach(card => observer.observe(card));
}

// ============================================================
//  28. ABOUT — PHILOSOPHY CARDS MOUSE SPOTLIGHT
// ============================================================
function initPhilCardSpotlight() {
  const philCards = document.querySelectorAll('.about-phil-card');

  philCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--px', `${x}px`);
      card.style.setProperty('--py', `${y}px`);
    });
  });

  // Inject spotlight overlay style
  if (!document.getElementById('phil-spotlight-style')) {
    const style = document.createElement('style');
    style.id = 'phil-spotlight-style';
    style.textContent = `
      .about-phil-card {
        --px: 50%;
        --py: 50%;
      }
      .about-phil-card::before {
        content: '';
        position: absolute;
        inset: 0;
        border-radius: inherit;
        background: radial-gradient(
          300px circle at var(--px) var(--py),
          rgba(168,85,247,0.06),
          transparent 60%
        );
        pointer-events: none;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 0;
      }
      .about-phil-card:hover::before { opacity: 1; }
      .about-phil-card > * { position: relative; z-index: 1; }
    `;
    document.head.appendChild(style);
  }
}

// ============================================================
//  29. DOM READY — Initialize All Modules
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
  // ── Core ──────────────────────────────────────
  initHeaderScroll();
  initMobileNav();
  initScrollSpy();
  initScrollReveal();
  initRippleEffect();
  initBackToTop();
  initSmoothScroll();
  initScrollProgress();



  // ── Skills section modules ─────────────────────
  initSkills3DTilt();
  initSkillsStatsCounter();
  initSkillsCardRipple();
});

// ============================================================
//  30. SKILLS — 3D TILT EFFECT ON CARDS
// ============================================================
function initSkills3DTilt() {
  const tiltSelectors = '.sk-service-card, .sk-feature-card, .sk-project-card, .process-node-card, .testimonials-achievements-card, .dp-principle-card, .dp-tool-card, .edu-item-card, .edu-cert-card, .edu-journey-card';
  const cards = document.querySelectorAll(tiltSelectors);
  if (!cards.length) return;

  cards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2); // -1 to 1
      const dy = (e.clientY - cy) / (rect.height / 2); // -1 to 1

      // Tilt intensity factors
      const maxTiltX = 8;
      const maxTiltY = 8;
      
      // Compute card specific scaling/lift on tilt
      let translateY = -6;
      let scale = 1.03;
      if (card.classList.contains('sk-tool-item')) {
        translateY = -4;
        scale = 1.04;
      }

      card.style.transform = `perspective(1000px) rotateX(${-dy * maxTiltY}deg) rotateY(${dx * maxTiltX}deg) translateY(${translateY}px) scale(${scale})`;
      card.style.transition = 'transform 0.1s ease';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
      card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease, box-shadow 0.4s ease';
    });
  });
}

// ============================================================
//  31. SKILLS — STATS COUNT-UP ANIMATION
// ============================================================
function initSkillsStatsCounter() {
  const stats = document.querySelectorAll('.animate-stat');
  if (!stats.length) return;

  const easeOutQuad = t => t * (2 - t);

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const suffix = el.dataset.suffix || '';
      const duration = 2000;
      const startTime = performance.now();

      function update(now) {
        const progress = Math.min((now - startTime) / duration, 1);
        const eased = easeOutQuad(progress);
        const current = Math.floor(eased * target);

        el.textContent = current + suffix;

        if (progress < 1) {
          requestAnimationFrame(update);
        } else {
          el.textContent = target + suffix;
        }
      }

      requestAnimationFrame(update);
      observer.unobserve(el);
    });
  }, { threshold: 0.15 });

  stats.forEach(s => observer.observe(s));
}

// ============================================================
//  32. SKILLS — CUSTOM CLICK RIPPLE ON CARDS
// ============================================================
function initSkillsCardRipple() {
  const rippleTargets = '.sk-creative-card, .sk-tool-item, .sk-programming-card, .sk-why-card, .sk-service-card, .sk-feature-card, .sk-project-card, .process-node-card, .testimonials-achievements-card, .dp-principle-card, .dp-tool-card, .edu-item-card, .edu-cert-card, .edu-journey-card, .edu-stat-card';
  const cards = document.querySelectorAll(rippleTargets);

  cards.forEach(card => {
    // Style card wrapper for absolute ripple containment
    card.style.position = 'relative';

    card.addEventListener('click', function(e) {
      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 1.5;
      
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        left: ${x}px;
        top: ${y}px;
        background: rgba(255, 255, 255, 0.08);
        border-radius: 50%;
        transform: scale(0);
        pointer-events: none;
        animation: cardRippleAnim 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        z-index: 10;
      `;

      // Inject custom animation style if not already existing
      if (!document.getElementById('card-ripple-style')) {
        const style = document.createElement('style');
        style.id = 'card-ripple-style';
        style.textContent = `
          @keyframes cardRippleAnim {
            to { transform: scale(1.5); opacity: 0; }
          }
        `;
        document.head.appendChild(style);
      }

      // Remove previous ripples to avoid DOM clutter
      const oldRipples = this.querySelectorAll('span[style*="cardRippleAnim"]');
      oldRipples.forEach(r => r.remove());

      this.appendChild(ripple);
      
      // Clean up after animation finishes
      ripple.addEventListener('animationend', () => {
        ripple.remove();
      });
    });
  });
}


