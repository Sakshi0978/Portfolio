// --- Testimonials Dataset ---
const testimonials = [
  {
    quote: "Looking forward to collaborating with Sakshi on creative branding and graphic design projects.",
    name: "Future Client",
    role: "Business Owner",
    company: "Coming Soon",
    initials: "FC"
  },
  {
    quote: "Ready to showcase feedback from future internships and professional collaborations.",
    name: "Future Recruiter",
    role: "Hiring Manager",
    company: "Coming Soon",
    initials: "FR"
  },
  {
    quote: "Professional, creative, and always eager to learn. Excited to work together in future projects.",
    name: "Future Team Member",
    role: "Creative Designer",
    company: "Coming Soon",
    initials: "FT"
  }
];

// --- Testimonials Slider Logic ---
function initTestimonials() {
  const track = document.getElementById("testimonials-wrapper");
  const dotsContainer = document.getElementById("testimonials-dots");
  const prevBtn = document.getElementById("slider-prev");
  const nextBtn = document.getElementById("slider-next");
  
  if (!track || !dotsContainer) return;
  
  let currentSlide = 0;
  let autoplayTimer = null;
  
  function getItemsPerSlide() {
    if (window.innerWidth > 1200) return 3;
    if (window.innerWidth > 640) return 2;
    return 1;
  }
  
  // Render Slides and Dots
  function renderSlider() {
    track.innerHTML = "";
    dotsContainer.innerHTML = "";
    
    testimonials.forEach((t, idx) => {
      // Create slide element
      const slide = document.createElement("div");
      slide.className = "testimonial-slide";
      
      slide.innerHTML = `
        <div class="testimonial-card">
          <div class="testimonial-quote-icon">“</div>
          <div class="testimonial-stars" aria-label="5 out of 5 stars">
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
          </div>
          <p class="testimonial-text">"${t.quote}"</p>
          <div class="testimonial-user">
            <div class="testimonial-avatar-box">
              <div class="testimonial-avatar-gradient">${t.initials}</div>
            </div>
            <div class="testimonial-info">
              <h4>${t.name}</h4>
              <span>${t.role} @ ${t.company}</span>
            </div>
          </div>
        </div>
      `;
      track.appendChild(slide);
      
      // Create dot element
      const dot = document.createElement("span");
      dot.className = `dot ${idx === 0 ? 'active' : ''}`;
      dot.addEventListener("click", () => {
        goToSlide(idx);
        resetAutoplay();
      });
      dotsContainer.appendChild(dot);
    });
    
    // Set initial responsive states
    goToSlide(0);
  }
  
  // Navigate to specific slide with responsiveness logic
  function goToSlide(index) {
    const itemsPerSlide = getItemsPerSlide();
    const maxIndex = testimonials.length - itemsPerSlide;
    
    if (index < 0) {
      currentSlide = maxIndex > 0 ? maxIndex : 0;
    } else if (index > maxIndex) {
      currentSlide = 0;
    } else {
      currentSlide = index;
    }
    
    // Translation percentage is relative to track width (which contains all slides side-by-side)
    const translation = -currentSlide * (100 / testimonials.length);
    track.style.transform = `translateX(${translation}%)`;
    
    // Update active class on dots
    const dots = dotsContainer.querySelectorAll(".dot");
    dots.forEach((dot, idx) => {
      if (idx === currentSlide) {
        dot.classList.add("active");
      } else {
        dot.classList.remove("active");
      }
      
      // Hide dots that are out of bounds for the current view
      if (idx > maxIndex) {
        dot.style.display = "none";
      } else {
        dot.style.display = "block";
      }
    });
  }
  
  // Next / Previous buttons event handlers
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      goToSlide(currentSlide - 1);
      resetAutoplay();
    });
  }
  
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      goToSlide(currentSlide + 1);
      resetAutoplay();
    });
  }
  
  // Autoplay functionality (every 5 seconds)
  function startAutoplay() {
    autoplayTimer = setInterval(() => {
      goToSlide(currentSlide + 1);
    }, 5000);
  }
  
  function resetAutoplay() {
    clearInterval(autoplayTimer);
    startAutoplay();
  }
  
  // Touch Swipe Support (Mobile swipe controls)
  let touchStartX = 0;
  let touchEndX = 0;
  
  track.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });
  
  track.addEventListener("touchend", (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });
  
  function handleSwipe() {
    const swipeThreshold = 50; // minimum distance in pixels
    if (touchStartX - touchEndX > swipeThreshold) {
      // Swiped Left -> next
      goToSlide(currentSlide + 1);
      resetAutoplay();
    } else if (touchEndX - touchStartX > swipeThreshold) {
      // Swiped Right -> prev
      goToSlide(currentSlide - 1);
      resetAutoplay();
    }
  }

  // Handle window resizing
  window.addEventListener("resize", () => {
    goToSlide(currentSlide);
  });

  // Setup slider initial triggers
  renderSlider();
  startAutoplay();
  
  // Pause autoplay on mouse hover
  const sliderContainer = document.querySelector(".testimonials-slider-container");
  if (sliderContainer) {
    sliderContainer.addEventListener("mouseenter", () => clearInterval(autoplayTimer));
    sliderContainer.addEventListener("mouseleave", startAutoplay);
  }
}

// Initialized on load
document.addEventListener("DOMContentLoaded", () => {
  initTestimonials();
});
