/**
 * SAKSHI KUMARI PORTFOLIO — Portfolio Projects Database & Rendering Logic
 */

const projects = [
  {
    id: 1,
    title: "RivGara Branding",
    category: "Brand Identity",
    image: "assets/Rivaara logo.png",
    description: "Developed a premium visual identity for an ethnic fashion brand including logo, typography, and promotional assets.",
    tools: ["Figma", "Photoshop", "Canva"],
    role: "Lead Brand Designer",
    duration: "3 Weeks",
    challenge: "Balancing traditional Indian heritage motifs with clean, minimal layout aesthetics to reflect modern premium ethnic wear without visual clutter.",
    outcome: "Delivered a comprehensive brand guidelines and logo kit that immediate achieved approval, giving the brand a cohesive launch identity.",
    overview: "RivGara is an upscale ethnic fashion brand aiming to bridge traditional heritage with modern premium apparel. The goal was to build a cohesive visual system reflecting rich cultural roots while appealing to the contemporary Indian consumer."
  },
  {
    id: 2,
    title: "CodeFest 2026",
    category: "Event Poster Design",
    image: "assets/project_codefest.png",
    description: "Designed a futuristic event poster with bold typography, visual hierarchy, and promotional elements for a coding competition.",
    tools: ["Photoshop", "Canva"],
    role: "Graphic Designer",
    duration: "1 Week",
    challenge: "Organizing a large amount of complex competition details (timelines, sponsors, tracks) inside a cohesive poster frame without causing design congestion.",
    outcome: "Helped secure record student attendance for the college event with over 350 team registration entries.",
    overview: "CodeFest 2026 required an event poster that would instantly catch the eye in busy campus corridors. The design concept revolves around hacker terminals and glowing cyberpunk landscapes."
  },
  {
    id: 3,
    title: "Volunteer Recruitment Campaign",
    category: "Social Media Design",
    image: "assets/Volunteers_image.png",
    description: "Created social media creatives for a volunteer recruitment campaign with a clean layout and engaging visuals.",
    tools: ["Canva", "Photoshop"],
    role: "Social Media Designer",
    duration: "10 Days",
    challenge: "Differentiating the campaign from standard corporate recruitment flyers by adding friendly illustrations and human touches.",
    outcome: "Delivered a clean, 4-post package that increased volunteer applications by 45% compared to the previous quarter's text-only posts.",
    overview: "A student-run NGO wanted a fresh, friendly recruitment banner campaign to scale up their volunteering team during summer intake. They needed visuals that felt approachable and warm."
  },
  {
    id: 4,
    title: "Music day 2026",
    category: "Event Branding",
    image: "assets/Music day.png",
    description: "This Music Day creative was designed to capture the excitement and emotion of music through bold visuals and a clean layout. Every element was carefully placed to create a balanced design that is both attractive and easy to read.",
    tools: ["Photoshop", "Illustrator"],
    role: "Visual Designer",
    duration: "1 Week",
    challenge: "Integrating classical Indian aesthetics with modern, premium concert poster lighting and design trends.",
    outcome: "Delivered a vibrant event graphic package used on campus screens, landing portals, and print flyers.",
    overview: "Taal Tarang is a state-level intercollegiate classical and contemporary dance fest. The creative direction required a poster capturing the flow, expression, and energy of dance through lighting overlays."
  },
  {
    id: 5,
    title: "Free Fire Tournament",
    category: "Gaming Poster",
    image: "assets/game tournamennt.jpeg",
    description: "Designed a gaming tournament poster with strong visual hierarchy, dynamic composition, and event branding.",
    tools: ["Photoshop", "Canva"],
    role: "Graphic Designer",
    duration: "5 Days",
    challenge: "Blending commercial gaming character assets into custom layouts while matching lighting and depth-of-field realistically.",
    outcome: "The tournament reached full registration slots within 24 hours of releasing the graphic.",
    overview: "To launch a campus-wide mobile gaming tournament, the esports club needed a poster that mirrored official game graphics. The goal was to build high hype and urgency around the prize pools."
  },
  {
    id: 6,
    title: "Farewell DJ Night",
    category: "Event Poster",
    image: "assets/farewell 26.jpeg",
    description: "Created an energetic farewell event poster combining bold typography, music visuals, and promotional information.",
    tools: ["Photoshop", "Canva"],
    role: "Graphic Designer",
    duration: "4 Days",
    challenge: "Balancing the fun, cinematic party visual with formal college rules and scheduling details.",
    outcome: "Created a highly praised visual used across all digital promotions, helping drive maximum senior attendance.",
    overview: "The graduating class farewell was themed as a cinematic DJ Night. The poster layout required concert-level neon aesthetics to evoke celebration and emotional attachment."
  }
];

// ============================================================
//  PORTFOLIO RENDER & INTERACTIVE CONTROLLERS
// ============================================================

document.addEventListener('DOMContentLoaded', () => {
  renderPortfolioGrid();
  initPortfolioModal();
});

// Render dynamic project cards
function renderPortfolioGrid() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;

  grid.innerHTML = '';

  projects.forEach((p, index) => {
    const card = document.createElement('article');
    card.className = 'project-card reveal-up';
    card.setAttribute('data-id', p.id);
    card.setAttribute('tabindex', '0');
    card.style.animationDelay = `${index * 0.08}s`;

    card.innerHTML = `
      <div class="project-card-img">
        <img src="${p.image}" alt="${p.title}" loading="lazy">
      </div>
      <div class="project-card-info">
        <div class="project-card-header">
          <span class="project-card-cat">${p.category}</span>
          <span class="project-card-arrow">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 2h10M12 2v10M2 12L12 2" stroke="currentColor"
                    stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </span>
        </div>
        <h3 class="project-card-title">${p.title}</h3>
        <p class="project-card-desc">${p.description}</p>
        <div class="project-card-tools">
          ${p.tools.map(t => `<span class="project-tool-tag">${t}</span>`).join('')}
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

// Fullscreen Modal Logic
function initPortfolioModal() {
  const modal = document.getElementById('portfolio-modal');
  const grid = document.getElementById('projects-grid');
  if (!modal || !grid) return;

  const mClose = modal.querySelector('.pm-close');
  const mPrev = modal.querySelector('.pm-prev');
  const mNext = modal.querySelector('.pm-next');

  let currentId = null;

  // Open modal on card click
  grid.addEventListener('click', e => {
    const card = e.target.closest('.project-card');
    if (!card) return;

    const id = parseInt(card.getAttribute('data-id'), 10);
    openProjectModal(id);
  });

  // Keyboard navigation on card focus (Enter key)
  grid.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      const card = e.target.closest('.project-card');
      if (card) {
        const id = parseInt(card.getAttribute('data-id'), 10);
        openProjectModal(id);
      }
    }
  });

  function openProjectModal(id) {
    const p = projects.find(item => item.id === id);
    if (!p) return;

    currentId = id;
    populateModalContent(p);

    modal.classList.add('active');
    document.body.style.overflow = 'hidden'; // lock scroll

    // Focus close button for accessibility
    if (mClose) mClose.focus();
  }

  function closeProjectModal() {
    modal.classList.remove('active');
    document.body.style.overflow = ''; // restore scroll

    // Return focus to the active card
    const card = document.querySelector(`.project-card[data-id="${currentId}"]`);
    if (card) card.focus();
  }

  function populateModalContent(p) {
    modal.querySelector('.pm-hero-img').src = p.image;
    modal.querySelector('.pm-hero-img').alt = p.title;
    modal.querySelector('.pm-category').textContent = p.category;
    modal.querySelector('.pm-title').textContent = p.title;
    modal.querySelector('.pm-overview').textContent = p.overview;
    modal.querySelector('.pm-challenge').textContent = p.challenge;
    modal.querySelector('.pm-outcome').textContent = p.outcome;
    modal.querySelector('.pm-role').textContent = p.role;
    modal.querySelector('.pm-duration').textContent = p.duration;

    // Render Tools
    const toolsContainer = modal.querySelector('.pm-tools-grid');
    toolsContainer.innerHTML = p.tools.map(t => `<span class="pm-tool-badge">${t}</span>`).join('');
  }

  // Prev / Next Project navigation
  if (mPrev) {
    mPrev.addEventListener('click', () => {
      let idx = projects.findIndex(item => item.id === currentId);
      let prevIdx = idx === 0 ? projects.length - 1 : idx - 1;
      openProjectModal(projects[prevIdx].id);
    });
  }

  if (mNext) {
    mNext.addEventListener('click', () => {
      let idx = projects.findIndex(item => item.id === currentId);
      let nextIdx = idx === projects.length - 1 ? 0 : idx + 1;
      openProjectModal(projects[nextIdx].id);
    });
  }

  // Close triggers
  if (mClose) mClose.addEventListener('click', closeProjectModal);

  // Close on backdrop click
  modal.addEventListener('click', e => {
    if (e.target === modal || e.target.classList.contains('pm-backdrop')) {
      closeProjectModal();
    }
  });

  // Close on Escape key
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeProjectModal();
    }
  });
}
