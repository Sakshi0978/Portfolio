/* ============================================================
   process.js — Design Process Section Animations
   Vanilla JS only. No frameworks.
   ============================================================ */

(function () {
  'use strict';

  // ── Utility: observe when element enters viewport ──────────
  function onVisible(el, callback, options) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(entry.target);
          if (options && options.once !== false) {
            observer.unobserve(entry.target);
          }
        }
      });
    }, { threshold: options?.threshold || 0.15, rootMargin: options?.rootMargin || '0px' });
    observer.observe(el);
    return observer;
  }

  // ── 1. Timeline Steps Scroll Reveal ───────────────────────
  function initTimelineReveal() {
    const steps = document.querySelectorAll('.dp-step');
    const trackFill = document.getElementById('dp-track-fill');
    const timelineWrap = document.getElementById('dp-timeline');
    if (!steps.length) return;

    // Animate the progress track when the section enters view
    if (timelineWrap && trackFill) {
      onVisible(timelineWrap, () => {
        setTimeout(() => trackFill.classList.add('animated'), 300);
      });
    }

    // Reveal each step individually with stagger
    steps.forEach((step) => {
      onVisible(step, (el) => {
        el.classList.add('visible');
      }, { threshold: 0.1 });
    });
  }

  // ── 2. Principle Card Scroll Reveal ───────────────────────
  function initPrinciplesReveal() {
    const cards = document.querySelectorAll('.dp-principle-card');
    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(40px)';
      card.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;

      onVisible(card, (el) => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, { threshold: 0.12 });
    });
  }

  // ── 3. Tool Card Scroll Reveal ────────────────────────────
  function initToolsReveal() {
    const cards = document.querySelectorAll('.dp-tool-card');
    cards.forEach((card, i) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px) scale(0.95)';
      card.style.transition = `opacity 0.5s ease ${i * 0.07}s, transform 0.5s ease ${i * 0.07}s`;

      onVisible(card, (el) => {
        el.style.opacity = '1';
        el.style.transform = 'translateY(0) scale(1)';
      }, { threshold: 0.1 });
    });
  }

  // ── 4. 3D Tilt on Step Cards ──────────────────────────────
  function initStepCardTilt() {
    const cards = document.querySelectorAll('.dp-step-card, .dp-principle-card, .dp-tool-card');
    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / (rect.width / 2);
        const dy = (e.clientY - cy) / (rect.height / 2);
        const tiltX = -dy * 6;
        const tiltY = dx * 6;
        card.style.transform = `perspective(800px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-6px)`;
      });
      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
      });
    });
  }

  // ── 5. Click Ripple on Cards ──────────────────────────────
  function initCardRipple() {
    const cards = document.querySelectorAll('.dp-step-card, .dp-principle-card, .dp-tool-card');
    cards.forEach((card) => {
      card.style.position = 'relative';
      card.style.overflow = 'hidden';
      card.addEventListener('click', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const ripple = document.createElement('span');
        ripple.style.cssText = `
          position: absolute;
          width: 10px; height: 10px;
          border-radius: 50%;
          background: rgba(255,255,255,0.25);
          transform: scale(0);
          left: ${x - 5}px; top: ${y - 5}px;
          pointer-events: none;
          animation: dpRippleAnim 0.6s ease forwards;
          z-index: 999;
        `;
        card.appendChild(ripple);
        setTimeout(() => ripple.remove(), 650);
      });
    });

    // Inject the ripple keyframe once
    if (!document.getElementById('dp-ripple-style')) {
      const style = document.createElement('style');
      style.id = 'dp-ripple-style';
      style.textContent = `
        @keyframes dpRippleAnim {
          0%   { transform: scale(0); opacity: 1; }
          100% { transform: scale(30); opacity: 0; }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // ── 6. Node Hover Glow Pulse ──────────────────────────────
  function initNodePulse() {
    const nodes = document.querySelectorAll('.dp-step-node');
    nodes.forEach((node) => {
      node.addEventListener('mouseenter', () => {
        const ring = node.querySelector('.dp-node-ring');
        if (ring) {
          ring.style.animation = 'dpNodePulse 0.6s ease forwards';
          setTimeout(() => { ring.style.animation = ''; }, 620);
        }
      });
    });

    if (!document.getElementById('dp-pulse-style')) {
      const style = document.createElement('style');
      style.id = 'dp-pulse-style';
      style.textContent = `
        @keyframes dpNodePulse {
          0%   { box-shadow: 0 0 0 0 rgba(168,85,247,0.5); }
          70%  { box-shadow: 0 0 0 12px rgba(168,85,247,0); }
          100% { box-shadow: 0 0 0 0 rgba(168,85,247,0); }
        }
      `;
      document.head.appendChild(style);
    }
  }

  // ── 7. Mouse Parallax on Background Blobs ─────────────────
  function initBlobParallax() {
    const section = document.querySelector('.dp-section');
    if (!section) return;
    const blobs = section.querySelectorAll('.dp-blob');

    section.addEventListener('mousemove', (e) => {
      const rect = section.getBoundingClientRect();
      const mx = (e.clientX - rect.left) / rect.width - 0.5;
      const my = (e.clientY - rect.top) / rect.height - 0.5;

      blobs.forEach((blob, i) => {
        const depth = (i + 1) * 12;
        blob.style.transform = `translate(${mx * depth}px, ${my * depth}px)`;
      });
    });

    section.addEventListener('mouseleave', () => {
      blobs.forEach((blob) => {
        blob.style.transform = '';
      });
    });
  }

  // ── 8. Active Step Highlight (scroll-based progress) ──────
  function initActiveStepTracking() {
    const steps = document.querySelectorAll('.dp-step');
    if (!steps.length) return;

    const trackFill = document.getElementById('dp-track-fill');

    function checkActiveStep() {
      const viewportMid = window.innerHeight / 2;
      let activeIndex = -1;

      steps.forEach((step, i) => {
        const rect = step.getBoundingClientRect();
        const stepMid = rect.top + rect.height / 2;
        if (stepMid < viewportMid + 100) {
          activeIndex = i;
        }
      });

      steps.forEach((step, i) => {
        const card = step.querySelector('.dp-step-card');
        if (!card) return;
        if (i === activeIndex) {
          card.style.borderColor = 'rgba(168, 85, 247, 0.3)';
        } else {
          card.style.borderColor = '';
        }
      });

      // Drive track fill based on proportion of visible steps
      if (trackFill && steps.length > 0) {
        const pct = activeIndex >= 0 ? ((activeIndex + 1) / steps.length) * 100 : 0;
        trackFill.style.width = `${Math.max(pct, 0)}%`;
      }
    }

    window.addEventListener('scroll', checkActiveStep, { passive: true });
    checkActiveStep();
  }

  // ── Init ───────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    initTimelineReveal();
    initPrinciplesReveal();
    initToolsReveal();
    initStepCardTilt();
    initCardRipple();
    initNodePulse();
    initBlobParallax();
    initActiveStepTracking();
  });

})();
