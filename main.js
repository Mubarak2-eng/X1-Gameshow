/* =========================================================
   X1 QUIZSHOW — MAIN.JS
   Interactions: Nav, Scroll Reveal, Video Player, Counter
   ========================================================= */

'use strict';

// ── 1. NAV ──────────────────────────────────────────────
(function initNav() {
  const nav    = document.getElementById('nav');
  const burger = document.getElementById('navBurger');
  const mobile = document.getElementById('navMobile');

  // Scroll state
  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });

  // Burger toggle
  burger.addEventListener('click', () => {
    const isOpen = mobile.classList.toggle('open');
    burger.classList.toggle('open', isOpen);
    burger.setAttribute('aria-expanded', String(isOpen));
  });

  // Close on link click
  document.querySelectorAll('[data-close]').forEach(el => {
    el.addEventListener('click', () => {
      mobile.classList.remove('open');
      burger.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  // Active link highlighting on scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        navLinks.forEach(l => {
          l.style.color = l.getAttribute('href') === '#' + id
            ? 'rgba(255,255,255,1)'
            : '';
        });
      }
    });
  }, { threshold: 0.35 });

  sections.forEach(s => sectionObserver.observe(s));
})();

// ── 2. SMOOTH SCROLL ────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

// ── 3. SCROLL REVEAL ────────────────────────────────────
(function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -40px 0px'
  });

  document.querySelectorAll('.reveal-up, .reveal-scale').forEach(el => {
    observer.observe(el);
  });
})();

// ── 4. VIDEO PLAYER ─────────────────────────────────────
(function initVideoPlayer() {
  const player   = document.getElementById('vsPlayer');
  const video    = document.getElementById('mainVideo');
  const playBtn  = document.getElementById('playBtn');
  const vcToggle = document.getElementById('vcToggle');
  const vcMute   = document.getElementById('vcMute');
  const vcFull   = document.getElementById('vcFull');
  const vcProgress = document.getElementById('vcProgress');
  const vcBar    = document.getElementById('vcBar');

  if (!player || !video) return;

  function play() {
    video.play();
    player.classList.add('playing');
    playBtn.classList.add('hidden');
    vcToggle.classList.remove('paused');
  }

  function pause() {
    video.pause();
    player.classList.remove('playing');
    playBtn.classList.remove('hidden');
    vcToggle.classList.add('paused');
  }

  // Big play button
  playBtn.addEventListener('click', e => {
    e.stopPropagation();
    play();
  });

  // Click on video to toggle
  video.addEventListener('click', () => {
    video.paused ? play() : pause();
  });

  // Inline play/pause button
  vcToggle.addEventListener('click', e => {
    e.stopPropagation();
    video.paused ? play() : pause();
  });

  // Mute
  vcMute.addEventListener('click', e => {
    e.stopPropagation();
    video.muted = !video.muted;
    vcMute.classList.toggle('muted', video.muted);
  });

  // Fullscreen
  vcFull.addEventListener('click', e => {
    e.stopPropagation();
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      player.requestFullscreen && player.requestFullscreen();
    }
  });

  // Progress bar
  video.addEventListener('timeupdate', () => {
    if (!video.duration) return;
    const pct = (video.currentTime / video.duration) * 100;
    vcBar.style.width = pct + '%';
  });

  vcProgress.addEventListener('click', e => {
    const rect = vcProgress.getBoundingClientRect();
    const pct  = (e.clientX - rect.left) / rect.width;
    video.currentTime = pct * video.duration;
  });

  // Ended
  video.addEventListener('ended', () => {
    pause();
    video.currentTime = 0;
  });
})();

// ── 5. COUNTER ANIMATION ────────────────────────────────
(function initCounters() {
  const counters = document.querySelectorAll('.tstat__num[data-target]');
  if (!counters.length) return;

  const easeOut = t => 1 - Math.pow(1 - t, 4);

  function animateCounter(el) {
    const target   = parseInt(el.dataset.target, 10);
    const duration = 2000;
    const start    = performance.now();

    function tick(now) {
      const elapsed = Math.min(now - start, duration);
      const progress = easeOut(elapsed / duration);
      const value = Math.round(progress * target);

      if (target >= 100000) {
        el.textContent = (value / 1000000).toFixed(target === 1000000 ? 1 : 0)
          .replace('.', ',') + ' Mio';
      } else {
        el.textContent = value.toLocaleString('de-DE');
      }

      if (elapsed < duration) requestAnimationFrame(tick);
      else el.textContent = target >= 100000
        ? (target / 1000000).toFixed(1).replace('.', ',') + ' Mio'
        : target.toLocaleString('de-DE');
    }

    requestAnimationFrame(tick);
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target);
        observer.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
})();

// ── 6. PARALLAX HERO ────────────────────────────────────
(function initParallax() {
  const heroVideo = document.querySelector('.hero__video');
  if (!heroVideo) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const y = window.scrollY;
        heroVideo.style.transform = `translateY(${y * 0.35}px)`;
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
})();

// ── 7. CURSOR GLOW (desktop only) ───────────────────────
(function initCursorGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return; // skip touch

  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 400px; height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(0,168,255,0.06) 0%, transparent 70%);
    pointer-events: none;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: opacity 0.3s ease;
    will-change: left, top;
  `;
  document.body.appendChild(glow);

  let mouseX = 0, mouseY = 0;
  let glowX = 0, glowY = 0;

  document.addEventListener('mousemove', e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateGlow() {
    glowX += (mouseX - glowX) * 0.08;
    glowY += (mouseY - glowY) * 0.08;
    glow.style.left = glowX + 'px';
    glow.style.top  = glowY + 'px';
    requestAnimationFrame(animateGlow);
  }
  animateGlow();
})();

// ── 8. BUTTON RIPPLE EFFECT ─────────────────────────────
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect   = btn.getBoundingClientRect();
    const size   = Math.max(rect.width, rect.height);
    ripple.style.cssText = `
      position: absolute;
      width: ${size}px; height: ${size}px;
      border-radius: 50%;
      background: rgba(255,255,255,0.2);
      transform: scale(0);
      animation: ripple 0.5s ease-out forwards;
      left: ${e.clientX - rect.left - size/2}px;
      top:  ${e.clientY - rect.top  - size/2}px;
      pointer-events: none;
    `;
    btn.style.position = 'relative';
    btn.style.overflow = 'hidden';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes ripple {
    to { transform: scale(2.5); opacity: 0; }
  }
`;
document.head.appendChild(rippleStyle);
