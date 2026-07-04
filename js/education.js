/**
 * education.js — Journey Section Scroll Reveal
 * Handles staggered fade-in animations for timeline items, cards, and stats.
 */

(function () {
  'use strict';

  function initJourneyReveal() {
    // Gather all animatable elements
    const timelineItems = document.querySelectorAll('.j-timeline-item');
    const infoCards = document.querySelectorAll('.j-info-card');
    const statItems = document.querySelectorAll('.j-stat-item');

    if (!timelineItems.length && !infoCards.length && !statItems.length) return;

    const observerOptions = {
      root: null,
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.15
    };

    // Stagger helper: adds .is-visible with a delay per index
    function revealWithStagger(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = parseInt(el.dataset.revealDelay || '0', 10);
          setTimeout(() => {
            el.classList.add('is-visible');
          }, delay);
          observer.unobserve(el);
        }
      });
    }

    const observer = new IntersectionObserver(revealWithStagger, observerOptions);

    // Timeline items — stagger by 120ms each
    timelineItems.forEach((item, i) => {
      item.dataset.revealDelay = String(i * 120);
      observer.observe(item);
    });

    // Info cards — stagger by 150ms each
    infoCards.forEach((card, i) => {
      card.dataset.revealDelay = String(i * 150);
      observer.observe(card);
    });

    // Stat items — stagger by 100ms each
    statItems.forEach((stat, i) => {
      stat.dataset.revealDelay = String(i * 100);
      observer.observe(stat);
    });
  }

  // Run on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initJourneyReveal);
  } else {
    initJourneyReveal();
  }
})();
