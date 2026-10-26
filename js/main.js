/* ============================================
   MAY PORTOFOLIO — JavaScript
   Scroll Reveals, Video Modal, Grade Compare,
   Cursor Glow, Smooth Scrolling
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ------------------------------------------
  // 1. Cursor Glow Effect
  // ------------------------------------------
  const cursorGlow = document.querySelector('.cursor-glow');
  let mouseX = 0, mouseY = 0, glowX = 0, glowY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursorGlow.classList.add('active');
  });

  document.addEventListener('mouseleave', () => {
    cursorGlow.classList.remove('active');
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    requestAnimationFrame(animateGlow);
  }
  animateGlow();


  // ------------------------------------------
  // 2. Intersection Observer — Scroll Reveals
  // ------------------------------------------
  const revealElements = document.querySelectorAll('.section-header, .portfolio-card, .grade-compare, .reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Don't unobserve so it stays visible
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -60px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));


  // ------------------------------------------
  // 3. Video Modal
  // ------------------------------------------
  const modal = document.getElementById('videoModal');
  const modalVideo = document.getElementById('modalVideo');
  const modalClose = document.getElementById('modalClose');
  const modalBackdrop = document.querySelector('.video-modal__backdrop');

  // Open modal on card click
  document.querySelectorAll('.portfolio-card[data-video]').forEach(card => {
    card.addEventListener('click', () => {
      const videoSrc = card.dataset.video;
      modalVideo.src = videoSrc;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      modalVideo.play().catch(() => {});
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    modalVideo.pause();
    modalVideo.src = '';
  }

  modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', closeModal);
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });


  // ------------------------------------------
  // 4. Color Grade Comparison Slider
  // ------------------------------------------
  const gradeCompare = document.querySelector('.grade-compare__container');
  if (gradeCompare) {
    const afterLayer = gradeCompare.querySelector('.grade-compare__after');
    const slider = gradeCompare.querySelector('.grade-compare__slider');
    let isDragging = false;

    function updateSlider(clientX) {
      const rect = gradeCompare.getBoundingClientRect();
      let x = clientX - rect.left;
      x = Math.max(0, Math.min(x, rect.width));
      const percent = (x / rect.width) * 100;

      afterLayer.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
      slider.style.left = percent + '%';
    }

    gradeCompare.addEventListener('mousedown', (e) => {
      isDragging = true;
      updateSlider(e.clientX);
    });
    document.addEventListener('mousemove', (e) => {
      if (isDragging) updateSlider(e.clientX);
    });
    document.addEventListener('mouseup', () => {
      isDragging = false;
    });

    // Touch support
    gradeCompare.addEventListener('touchstart', (e) => {
      isDragging = true;
      updateSlider(e.touches[0].clientX);
    });
    document.addEventListener('touchmove', (e) => {
      if (isDragging) updateSlider(e.touches[0].clientX);
    });
    document.addEventListener('touchend', () => {
      isDragging = false;
    });
  }


  // ------------------------------------------
  // 5. Parallax on Hero Elements
  // ------------------------------------------
  const heroSection = document.querySelector('.hero');
  const profileImg = document.querySelector('.hero__profile-img');
  const textBlock = document.querySelector('.hero__text-block');

  if (heroSection && profileImg) {
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      const heroH = heroSection.offsetHeight;
      if (scrollY < heroH) {
        const progress = scrollY / heroH;
        profileImg.style.transform = `translateY(${progress * 80}px)`;
        profileImg.style.opacity = 1 - progress * 1.3;
        if (textBlock) {
          textBlock.style.transform = `translate(-50%, calc(-55% + ${progress * 40}px))`;
          textBlock.style.opacity = 1 - progress * 1.1;
        }
      }
    }, { passive: true });
  }


  // ------------------------------------------
  // 6. Smooth Scroll for Anchor Links
  // ------------------------------------------
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  // ------------------------------------------
  // 7. Hero Video Playback Rate
  // ------------------------------------------
  const heroVideo = document.querySelector('.hero__video-wrap video');
  if (heroVideo) {
    heroVideo.playbackRate = 0.75;
  }

});
