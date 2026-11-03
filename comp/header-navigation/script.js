const header = document.querySelector('[data-header]');
const triggers = [...document.querySelectorAll('[data-menu-trigger]')];
const menus = [...document.querySelectorAll('[data-menu]')];
const mobileToggle = document.querySelector('[data-mobile-toggle]');
const mobileMenu = document.querySelector('[data-mobile-menu]');
const interactiveHero = document.querySelector('[data-interactive-hero]');
const pointerGlow = document.querySelector('[data-pointer-glow]');
const navSurfaceSentinel = document.querySelector('[data-nav-sentinel]');

if (header && navSurfaceSentinel && 'IntersectionObserver' in window) {
  header.dataset.scrollEnhanced = 'true';
  const navSurfaceObserver = new IntersectionObserver(([entry]) => {
    header.dataset.scrolled = String(!entry.isIntersecting);
  }, { threshold: 0 });
  navSurfaceObserver.observe(navSurfaceSentinel);
}

function closeDesktopMenus() {
  triggers.forEach((trigger) => trigger.setAttribute('aria-expanded', 'false'));
  menus.forEach((menu) => { menu.hidden = true; });
}

triggers.forEach((trigger) => {
  trigger.addEventListener('click', () => {
    const name = trigger.dataset.menuTrigger;
    const target = document.querySelector(`[data-menu="${name}"]`);
    const willOpen = target.hidden;
    closeDesktopMenus();
    if (willOpen) {
      target.hidden = false;
      trigger.setAttribute('aria-expanded', 'true');
    }
  });
});

mobileToggle.addEventListener('click', () => {
  const willOpen = mobileMenu.hidden;
  closeDesktopMenus();
  mobileMenu.hidden = !willOpen;
  mobileToggle.setAttribute('aria-expanded', String(willOpen));
  mobileToggle.setAttribute('aria-label', willOpen ? 'Close menu' : 'Open menu');
  document.body.style.overflow = willOpen ? 'hidden' : '';
});

document.addEventListener('click', (event) => {
  if (!header.contains(event.target)) closeDesktopMenus();
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeDesktopMenus();
    mobileMenu.hidden = true;
    mobileToggle.setAttribute('aria-expanded', 'false');
    mobileToggle.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
  }
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 860) {
    mobileMenu.hidden = true;
    mobileToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  } else {
    closeDesktopMenus();
  }
});

if (interactiveHero && pointerGlow && window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  let pointerX = 0;
  let pointerY = 0;
  let animationFrame = 0;
  let lastTrailX = 0;
  let lastTrailY = 0;
  let trailIndex = 0;
  const trailPool = Array.from({ length: 16 }, () => {
    const trail = document.createElement('span');
    trail.className = 'trail-glow';
    trail.setAttribute('aria-hidden', 'true');
    interactiveHero.insertBefore(trail, pointerGlow);
    return trail;
  });

  const releaseTrail = (x, y) => {
    const trail = trailPool[trailIndex];
    trailIndex = (trailIndex + 1) % trailPool.length;
    trail.getAnimations().forEach((animation) => animation.cancel());
    trail.animate(
      [
        { opacity: 0.42, transform: `translate3d(${x - 110}px, ${y - 110}px, 0) scale(.95)` },
        { opacity: 0, transform: `translate3d(${x - 110}px, ${y - 110}px, 0) scale(1.12)` }
      ],
      { duration: 900, easing: 'cubic-bezier(.23, 1, .32, 1)', fill: 'both' }
    );
  };

  const paintGlow = () => {
    pointerGlow.style.transform = `translate3d(${pointerX - 310}px, ${pointerY - 310}px, 0)`;
    animationFrame = 0;
  };

  interactiveHero.addEventListener('pointerenter', () => {
    interactiveHero.dataset.pointerActive = 'true';
    lastTrailX = pointerX;
    lastTrailY = pointerY;
  });

  interactiveHero.addEventListener('pointermove', (event) => {
    const bounds = interactiveHero.getBoundingClientRect();
    pointerX = event.clientX - bounds.left;
    pointerY = event.clientY - bounds.top;
    const trailDistance = Math.hypot(pointerX - lastTrailX, pointerY - lastTrailY);
    if (trailDistance >= 20) {
      releaseTrail(pointerX, pointerY);
      lastTrailX = pointerX;
      lastTrailY = pointerY;
    }
    if (!animationFrame) animationFrame = requestAnimationFrame(paintGlow);
  });

  interactiveHero.addEventListener('pointerleave', () => {
    interactiveHero.dataset.pointerActive = 'false';
  });
}

const salesEngines = document.querySelector('[data-sales-engines]');

if (salesEngines && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const revealItems = [
    salesEngines.querySelector('.sales-engines__intro'),
    ...salesEngines.querySelectorAll('[data-engine-card]')
  ].filter(Boolean);

  salesEngines.dataset.motion = 'ready';
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.16 });

  revealItems.forEach((item) => revealObserver.observe(item));
}

// Stripe-Style Interactive Spotlight & Parallax Tracking for Engine Cards
const engineCards = [...document.querySelectorAll('[data-engine-card]')];
if (engineCards.length > 0 && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  engineCards.forEach((card) => {
    let rAF = 0;
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const px = Number((((x / rect.width) - 0.5) * 2).toFixed(3));
      const py = Number((((y / rect.height) - 0.5) * 2).toFixed(3));

      if (rAF) cancelAnimationFrame(rAF);
      rAF = requestAnimationFrame(() => {
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
        card.style.setProperty('--px', px);
        card.style.setProperty('--py', py);
      });
    });

    card.addEventListener('pointerleave', () => {
      if (rAF) cancelAnimationFrame(rAF);
      card.style.setProperty('--mouse-x', '50%');
      card.style.setProperty('--mouse-y', '0%');
      card.style.setProperty('--px', '0');
      card.style.setProperty('--py', '0');
    });
  });
}

document.addEventListener('visibilitychange', () => {
  document.body.dataset.pageHidden = String(document.hidden);
});

// Reliable Bidirectional Scroll Theme Switcher
const videoTour = document.getElementById('video-tour');
const workflowSec = document.getElementById('workflow');
const themeSections = [
  ...document.querySelectorAll('section[data-theme-trigger], footer[data-theme-trigger], [data-interactive-hero], .site-footer')
];

function updateThemesOnScroll() {
  const scrollMid = window.innerHeight * 0.45;
  
  // 1. Page Dark Zone Active state (Section 5 through Section 7)
  if (videoTour && workflowSec) {
    const videoRect = videoTour.getBoundingClientRect();
    const workflowRect = workflowSec.getBoundingClientRect();
    const isDarkActive = videoRect.top <= scrollMid && workflowRect.bottom >= scrollMid;
    if (document.body.dataset.darkActive !== String(isDarkActive)) {
      document.body.dataset.darkActive = String(isDarkActive);
    }
  }

  // 2. Navigation 2-Version Adaptive Theme (Dark Mode vs Light Mode depending on background)
  if (header) {
    const headerProbeY = 35; // Header contact probe line
    let detectedTheme = 'dark';

    for (const section of themeSections) {
      const rect = section.getBoundingClientRect();
      if (rect.top <= headerProbeY && rect.bottom > headerProbeY) {
        if (section.dataset.themeTrigger) {
          detectedTheme = section.dataset.themeTrigger;
        } else if (section.classList.contains('dark-zone') || section.classList.contains('site-footer') || section.id === 'hero' || section.id === 'cta') {
          detectedTheme = 'dark';
        } else {
          detectedTheme = 'light';
        }
        break;
      }
    }

    if (header.dataset.navTheme !== detectedTheme) {
      header.dataset.navTheme = detectedTheme;
    }
  }
}

let scrollThemeTicking = false;
window.addEventListener('scroll', () => {
  if (!scrollThemeTicking) {
    requestAnimationFrame(() => {
      updateThemesOnScroll();
      scrollThemeTicking = false;
    });
    scrollThemeTicking = true;
  }
}, { passive: true });

window.addEventListener('resize', () => {
  if (!scrollThemeTicking) {
    requestAnimationFrame(() => {
      updateThemesOnScroll();
      scrollThemeTicking = false;
    });
    scrollThemeTicking = true;
  }
}, { passive: true });

// Run on initial load
updateThemesOnScroll();

// Section 05: Platform Video Showcase & Synchronized Interactive Chapter Sync
const videoFrame = document.getElementById('videoFrame');
const videoPlayerContainer = document.getElementById('videoPlayerContainer');
const videoResetBtn = document.getElementById('videoResetBtn');
const chapterChips = [...document.querySelectorAll('.chapter-chip[data-video-start]')];
const YOUTUBE_VIDEO_ID = 'ukIm5NKqZ9E';
let ytPlayer = null;
let ytProgressTimer = null;
let isYtApiLoading = false;
let currentActiveChapterIndex = 0;

// Sorted list of chapter start times in seconds
const chapterTimestamps = chapterChips.map((chip, index) => ({
  index,
  chip,
  start: parseInt(chip.dataset.videoStart || '0', 10)
})).sort((a, b) => a.start - b.start);

function updateActiveChapterByTime(currentTime) {
  if (typeof currentTime !== 'number' || isNaN(currentTime)) return;
  // Find the last chapter whose start time is <= currentTime
  let matchedIndex = 0;
  for (let i = chapterTimestamps.length - 1; i >= 0; i--) {
    if (currentTime >= chapterTimestamps[i].start - 0.5) {
      matchedIndex = chapterTimestamps[i].index;
      break;
    }
  }

  if (matchedIndex !== currentActiveChapterIndex) {
    currentActiveChapterIndex = matchedIndex;
    chapterChips.forEach((chip, idx) => {
      chip.classList.toggle('is-active', idx === matchedIndex);
    });
  }
}

function startProgressPolling() {
  stopProgressPolling();
  ytProgressTimer = setInterval(() => {
    if (ytPlayer && typeof ytPlayer.getCurrentTime === 'function' && typeof ytPlayer.getPlayerState === 'function') {
      const state = ytPlayer.getPlayerState();
      // 1 = playing, 3 = buffering
      if (state === 1 || state === 3) {
        const time = ytPlayer.getCurrentTime();
        updateActiveChapterByTime(time);
      }
    }
  }, 250);
}

function stopProgressPolling() {
  if (ytProgressTimer) {
    clearInterval(ytProgressTimer);
    ytProgressTimer = null;
  }
}

function playVideo(startTime = 0) {
  if (!videoFrame || !videoPlayerContainer) return;

  const startSec = parseInt(startTime, 10) || 0;

  // Set visual playing state
  videoFrame.classList.add('is-playing');
  videoFrame.setAttribute('aria-expanded', 'true');

  // Immediately update active chip
  updateActiveChapterByTime(startSec);

  // If YT.Player is already initialized:
  if (ytPlayer && typeof ytPlayer.seekTo === 'function') {
    ytPlayer.seekTo(startSec, true);
    ytPlayer.playVideo();
    startProgressPolling();
    return;
  }

  // Load YouTube IFrame API if not present
  if (!window.YT) {
    if (!isYtApiLoading) {
      isYtApiLoading = true;
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
  }

  // If player container doesn't have iframe, initialize
  if (window.YT && window.YT.Player) {
    initYtPlayer(startSec);
  } else {
    // Direct embed fallback while API loads or if offline
    videoPlayerContainer.innerHTML = `<iframe id="videoIframe" src="https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?enablejsapi=1&autoplay=1&rel=0&playsinline=1&modestbranding=1&start=${startSec}" title="RakanSales in 2 Mins - AI Sales CRM Overview" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;

    // Polling until window.YT is ready to bind
    const checkYt = setInterval(() => {
      if (window.YT && window.YT.Player) {
        clearInterval(checkYt);
        initYtPlayer(startSec);
      }
    }, 200);

    setTimeout(() => clearInterval(checkYt), 3000);
  }
}

function initYtPlayer(startSec = 0) {
  try {
    videoPlayerContainer.innerHTML = '<div id="ytPlayerMount"></div>';
    ytPlayer = new window.YT.Player('ytPlayerMount', {
      videoId: YOUTUBE_VIDEO_ID,
      playerVars: {
        autoplay: 1,
        start: startSec,
        rel: 0,
        playsinline: 1,
        modestbranding: 1
      },
      events: {
        onReady: (event) => {
          if (startSec > 0) {
            event.target.seekTo(startSec, true);
          }
          event.target.playVideo();
          startProgressPolling();
        },
        onStateChange: (event) => {
          if (event.data === window.YT.PlayerState.PLAYING) {
            startProgressPolling();
          } else if (event.data === window.YT.PlayerState.PAUSED || event.data === window.YT.PlayerState.ENDED) {
            stopProgressPolling();
            if (event.data === window.YT.PlayerState.ENDED) {
              updateActiveChapterByTime(0);
            }
          }
        }
      }
    });
  } catch (err) {
    // Fallback: direct iframe
    videoPlayerContainer.innerHTML = `<iframe id="videoIframe" src="https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?enablejsapi=1&autoplay=1&rel=0&playsinline=1&modestbranding=1&start=${startSec}" title="RakanSales in 2 Mins - AI Sales CRM Overview" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>`;
  }
}

// Global hook for YouTube IFrame API
window.onYouTubeIframeAPIReady = function() {
  if (videoFrame && videoFrame.classList.contains('is-playing') && !ytPlayer) {
    const activeChip = document.querySelector('.chapter-chip.is-active');
    const start = activeChip ? parseInt(activeChip.dataset.videoStart || '0', 10) : 0;
    initYtPlayer(start);
  }
};

// Also listen to postMessage from YouTube iframe as secondary fallback
window.addEventListener('message', (event) => {
  try {
    const data = typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
    if (data && data.event === 'infoDelivery' && data.info && typeof data.info.currentTime === 'number') {
      updateActiveChapterByTime(data.info.currentTime);
    }
  } catch (e) {}
});

function stopVideo() {
  stopProgressPolling();
  if (ytPlayer && typeof ytPlayer.stopVideo === 'function') {
    try { ytPlayer.stopVideo(); } catch (e) {}
  }
  if (videoPlayerContainer) {
    videoPlayerContainer.innerHTML = '';
  }
  ytPlayer = null;
  if (videoFrame) {
    videoFrame.classList.remove('is-playing');
    videoFrame.setAttribute('aria-expanded', 'false');
  }
  updateActiveChapterByTime(0);
}

// Click on Video Frame to play
if (videoFrame) {
  videoFrame.addEventListener('click', (event) => {
    if (event.target.closest('#videoResetBtn')) return;
    if (!videoFrame.classList.contains('is-playing')) {
      event.preventDefault();
      const activeChip = document.querySelector('.chapter-chip.is-active');
      const start = activeChip ? parseInt(activeChip.dataset.videoStart || '0', 10) : 0;
      playVideo(start);
    }
  });

  videoFrame.addEventListener('keydown', (event) => {
    if (!videoFrame.classList.contains('is-playing') && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      const activeChip = document.querySelector('.chapter-chip.is-active');
      const start = activeChip ? parseInt(activeChip.dataset.videoStart || '0', 10) : 0;
      playVideo(start);
    }
  });
}

// Chapter Chips Clicks
chapterChips.forEach((chip) => {
  chip.addEventListener('click', (event) => {
    event.preventDefault();
    const start = parseInt(chip.dataset.videoStart || '0', 10);
    playVideo(start);
  });
});

// Reset / Stop button
if (videoResetBtn) {
  videoResetBtn.addEventListener('click', (event) => {
    event.stopPropagation();
    stopVideo();
  });
}

// Escape key to stop video playback
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && videoFrame && videoFrame.classList.contains('is-playing')) {
    stopVideo();
  }
});

// Section 07: Scroll-Triggered Lifecycle Stages
// The section pins on desktop; each scroll step swaps to the next card.
// Below 981px wide (or on short viewports) the cards render as a plain vertical list.
const workflowScroll = document.querySelector('[data-workflow-scroll]');
if (workflowScroll) {
  const stageCards = [...workflowScroll.querySelectorAll('.workflow-stack-card')];
  const stageSteps = [...workflowScroll.querySelectorAll('.workflow-progress__step')];
  const pinQuery = window.matchMedia('(min-width: 981px) and (min-height: 640px)');
  const reduceQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
  let activeStage = -1;
  let stageTicking = false;

  const setActiveStage = (index) => {
    if (index === activeStage) return;
    activeStage = index;
    stageCards.forEach((card, i) => {
      card.classList.toggle('is-active', i === index);
      card.classList.toggle('is-past', i < index);
      card.inert = i !== index;
    });
    stageSteps.forEach((step, i) => {
      step.classList.toggle('is-active', i === index);
      step.classList.toggle('is-complete', i < index);
      if (i === index) step.setAttribute('aria-current', 'step');
      else step.removeAttribute('aria-current');
    });
  };

  const getScrollable = () => workflowScroll.offsetHeight - window.innerHeight;
  const stageBars = stageSteps.map((step) => step.querySelector('.workflow-progress__bar'));

  // Each bar fills in proportion to how far the reader has scrolled through its stage
  const setStageFill = (progress) => {
    const scaled = progress * stageCards.length;
    stageBars.forEach((bar, i) => {
      if (bar) bar.style.setProperty('--fill', Math.min(Math.max(scaled - i, 0), 1).toFixed(4));
    });
  };

  const updateStage = () => {
    stageTicking = false;
    if (!pinQuery.matches) return;
    const scrollable = getScrollable();
    if (scrollable <= 0) return setActiveStage(0);
    const rawProgress = Math.min(Math.max(-workflowScroll.getBoundingClientRect().top / scrollable, 0), 1);
    setStageFill(rawProgress);
    setActiveStage(Math.floor(Math.min(rawProgress, 0.9999) * stageCards.length));
  };

  // Mobile Timed Accordion with Progress Bar
  const MOBILE_STAGE_DURATION = 10000; // 10s per stage
  let mobileActiveIndex = 0;
  let mobileTimerRaf = null;
  let mobileTimerStartTime = null;
  let mobileTimerPaused = false;

  const setMobileCardFill = (card, fill) => {
    card.style.setProperty('--card-fill', Math.min(Math.max(fill, 0), 1).toFixed(4));
  };

  const clearMobileFills = () => {
    stageCards.forEach((c) => setMobileCardFill(c, 0));
  };

  const stopMobileTimer = () => {
    if (mobileTimerRaf) {
      cancelAnimationFrame(mobileTimerRaf);
      mobileTimerRaf = null;
    }
    mobileTimerStartTime = null;
  };

  const startMobileTimer = () => {
    stopMobileTimer();
    if (pinQuery.matches || reduceQuery.matches) return;
    
    mobileTimerStartTime = performance.now();
    const tick = (now) => {
      if (pinQuery.matches) return;
      if (!mobileTimerPaused) {
        const elapsed = now - mobileTimerStartTime;
        const progress = Math.min(elapsed / MOBILE_STAGE_DURATION, 1);
        const currentCard = stageCards[mobileActiveIndex];
        if (currentCard) setMobileCardFill(currentCard, progress);

        if (progress >= 1) {
          // Advance to next stage in carousel loop
          const nextIndex = (mobileActiveIndex + 1) % stageCards.length;
          setMobileActiveStage(nextIndex, false);
          return;
        }
      } else {
        // Extend start time while paused so progress doesn't jump
        mobileTimerStartTime = performance.now() - (parseFloat(stageCards[mobileActiveIndex]?.style.getPropertyValue('--card-fill') || '0') * MOBILE_STAGE_DURATION);
      }
      mobileTimerRaf = requestAnimationFrame(tick);
    };
    mobileTimerRaf = requestAnimationFrame(tick);
  };

  const setMobileActiveStage = (index, userInitiated = false) => {
    mobileActiveIndex = index;
    stageCards.forEach((card, i) => {
      const isCurrent = i === index;
      card.classList.toggle('is-expanded', isCurrent);
      const toggle = card.querySelector('.workflow-card-toggle');
      if (toggle) toggle.setAttribute('aria-expanded', String(isCurrent));
      setMobileCardFill(card, i < index ? 1 : 0);
    });

    startMobileTimer();
  };

  const applyStageMode = () => {
    const pinned = pinQuery.matches;
    workflowScroll.classList.toggle('is-scroll-driven', pinned);
    activeStage = -1;
    if (pinned) {
      stopMobileTimer();
      clearMobileFills();
      updateStage();
      stageCards.forEach((card) => {
        const toggle = card.querySelector('.workflow-card-toggle');
        if (toggle) toggle.setAttribute('aria-expanded', 'true');
      });
    } else {
      stageCards.forEach((card) => {
        card.classList.remove('is-active', 'is-past');
        card.inert = false;
      });
      setMobileActiveStage(0, false);
    }
  };

  // Mobile Accordion Click Handling
  stageCards.forEach((card, idx) => {
    const toggle = card.querySelector('.workflow-card-toggle');
    if (!toggle) return;
    toggle.addEventListener('click', () => {
      if (pinQuery.matches) return; // Desktop is scroll-driven
      setMobileActiveStage(idx, true);
    });
  });

  // Pause timer on touch/hover so user can interact and read comfortably
  stageCards.forEach((card) => {
    card.addEventListener('pointerenter', () => { if (!pinQuery.matches) mobileTimerPaused = true; });
    card.addEventListener('pointerleave', () => { if (!pinQuery.matches) mobileTimerPaused = false; });
  });

  // Progress rail: jump to the middle of a stage's scroll window
  stageSteps.forEach((step, i) => {
    step.addEventListener('click', () => {
      const trackTop = window.scrollY + workflowScroll.getBoundingClientRect().top;
      const target = trackTop + getScrollable() * ((i + 0.5) / stageCards.length);
      window.scrollTo({ top: target, behavior: reduceQuery.matches ? 'auto' : 'smooth' });
    });
  });

  window.addEventListener(
    'scroll',
    () => {
      if (pinQuery.matches) {
        if (!stageTicking) {
          stageTicking = true;
          window.requestAnimationFrame(updateStage);
        }
      }
    },
    { passive: true }
  );
  window.addEventListener('resize', updateStage, { passive: true });
  pinQuery.addEventListener('change', applyStageMode);
  applyStageMode();
}

// Section 09: RAKAN AI Modules Accordion & Dynamic Viewport Switcher
const moduleTabs = [...document.querySelectorAll('.module-item')];
const moduleScreens = [...document.querySelectorAll('.module-screen')];

function switchModuleTab(targetIndex, focus = false) {
  const index = parseInt(targetIndex, 10);
  if (isNaN(index) || index < 0 || index >= moduleTabs.length) return;

  moduleTabs.forEach((t, i) => {
    const isActive = i === index;
    t.classList.toggle('is-active', isActive);
    t.setAttribute('aria-selected', String(isActive));
    t.setAttribute('tabindex', isActive ? '0' : '-1');
  });

  moduleScreens.forEach((screen) => {
    const isActive = parseInt(screen.dataset.moduleScreen, 10) === index;
    screen.classList.toggle('is-active', isActive);
    screen.hidden = !isActive;
  });

  if (focus && moduleTabs[index]) {
    moduleTabs[index].focus();
  }
}

moduleTabs.forEach((tab, index) => {
  tab.addEventListener('click', () => {
    switchModuleTab(index);
  });

  tab.addEventListener('keydown', (event) => {
    let nextIndex = null;
    if (event.key === 'ArrowDown' || event.key === 'ArrowRight') {
      event.preventDefault();
      nextIndex = (index + 1) % moduleTabs.length;
    } else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') {
      event.preventDefault();
      nextIndex = (index - 1 + moduleTabs.length) % moduleTabs.length;
    } else if (event.key === 'Home') {
      event.preventDefault();
      nextIndex = 0;
    } else if (event.key === 'End') {
      event.preventDefault();
      nextIndex = moduleTabs.length - 1;
    } else if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      switchModuleTab(index);
    }

    if (nextIndex !== null) {
      switchModuleTab(nextIndex, true);
    }
  });
});

// Section 09: Ambient Fluid Light WebGL / Canvas Shader
(function initModulesShader() {
  const canvas = document.getElementById('modules-shader-canvas');
  if (!canvas) return;

  const section = document.getElementById('capabilities');
  let isVisible = false;
  let animFrameId = null;

  // Track mouse coordinates with smooth lerp
  let mouse = { x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 };
  
  if (section) {
    section.addEventListener('mousemove', (e) => {
      const rect = section.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        mouse.targetX = (e.clientX - rect.left) / rect.width;
        mouse.targetY = 1.0 - (e.clientY - rect.top) / rect.height;
      }
    }, { passive: true });
  }

  // Try WebGL first
  const gl = canvas.getContext('webgl', { alpha: true, antialias: false, powerPreference: 'low-power' }) ||
             canvas.getContext('experimental-webgl', { alpha: true, antialias: false, powerPreference: 'low-power' });

  if (gl) {
    const vsSource = `
      attribute vec2 a_position;
      void main() {
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;

      // 2D Simplex-like noise helper
      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v - i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
        m = m * m;
        m = m * m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        float aspect = u_resolution.x / u_resolution.y;
        vec2 p = uv;
        p.x *= aspect;

        float t = u_time * 0.18;
        
        // Mouse influence
        vec2 m = u_mouse * vec2(aspect, 1.0);
        float d = distance(p, m);
        float mouseGlow = smoothstep(1.2, 0.0, d) * 0.35;

        // Multi-octave wave distortion
        float n1 = snoise(p * 1.3 + vec2(t * 0.5, t * 0.3));
        float n2 = snoise(p * 2.2 - vec2(t * 0.4, n1 * 0.6) + m * 0.2);
        float n3 = snoise(p * 3.5 + vec2(n2 * 0.5, t * 0.25));

        // Organic color field blending (Emerald, Mint, Cyan, Light Slate)
        vec3 colEmerald = vec3(0.0, 0.815, 0.517); // #00D084
        vec3 colMint    = vec3(0.082, 0.502, 0.239); // #15803D
        vec3 colCyan    = vec3(0.22, 0.74, 0.97);  // #38BDF8
        vec3 colBase    = vec3(0.957, 0.965, 0.953); // #F4F6F3

        float wave1 = smoothstep(-0.3, 0.7, n1 + mouseGlow);
        float wave2 = smoothstep(-0.4, 0.6, n2 * 0.8);
        float wave3 = smoothstep(-0.5, 0.5, n3 * 0.6);

        vec3 color = mix(colBase, colEmerald, wave1 * 0.18);
        color = mix(color, colCyan, wave2 * 0.12);
        color = mix(color, colMint, wave3 * 0.08);

        // Soft center illumination
        float radial = 1.0 - distance(uv, vec2(0.5, 0.45)) * 0.9;
        radial = clamp(radial, 0.0, 1.0);
        color += colEmerald * radial * 0.06;

        // Vignette fade at borders
        float borderFade = smoothstep(0.0, 0.08, uv.x) * smoothstep(1.0, 0.92, uv.x) *
                           smoothstep(0.0, 0.08, uv.y) * smoothstep(1.0, 0.92, uv.y);

        gl_FragColor = vec4(color, borderFade * 0.85);
      }
    `;

    function createShader(gl, type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vertexShader = createShader(gl, gl.VERTEX_SHADER, vsSource);
    const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fsSource);

    if (!vertexShader || !fragmentShader) return;

    const program = gl.createProgram();
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

    gl.useProgram(program);

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    const resolutionLocation = gl.getUniformLocation(program, 'u_resolution');
    const timeLocation = gl.getUniformLocation(program, 'u_time');
    const mouseLocation = gl.getUniformLocation(program, 'u_mouse');

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]), gl.STATIC_DRAW);

    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width * dpr || canvas.height !== height * dpr) {
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    }

    window.addEventListener('resize', resize, { passive: true });
    resize();

    let startTime = performance.now();

    function render(now) {
      if (!isVisible) return;

      mouse.x += (mouse.targetX - mouse.x) * 0.05;
      mouse.y += (mouse.targetY - mouse.y) * 0.05;

      const elapsed = (now - startTime) * 0.001;

      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform1f(timeLocation, prefersReducedMotion.matches ? 1.0 : elapsed);
      gl.uniform2f(mouseLocation, mouse.x, mouse.y);

      gl.drawArrays(gl.TRIANGLES, 0, 6);

      if (!prefersReducedMotion.matches) {
        animFrameId = requestAnimationFrame(render);
      }
    }

    // IntersectionObserver to pause when off-screen
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          resize();
          cancelAnimationFrame(animFrameId);
          animFrameId = requestAnimationFrame(render);
        } else {
          cancelAnimationFrame(animFrameId);
        }
      });
    }, { threshold: 0.05 });

    if (section) observer.observe(section);

  } else {
    // 2D Canvas Procedural Fallback
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resize2D() {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = canvas.clientWidth * dpr;
      canvas.height = canvas.clientHeight * dpr;
    }
    window.addEventListener('resize', resize2D, { passive: true });
    resize2D();

    function render2D(now) {
      if (!isVisible) return;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const t = now * 0.0005;
      const x1 = w * (0.5 + 0.2 * Math.sin(t));
      const y1 = h * (0.4 + 0.15 * Math.cos(t * 0.8));
      const g1 = ctx.createRadialGradient(x1, y1, 10, x1, y1, w * 0.45);
      g1.addColorStop(0, 'rgba(0, 208, 132, 0.14)');
      g1.addColorStop(1, 'rgba(0, 208, 132, 0)');
      ctx.fillStyle = g1;
      ctx.fillRect(0, 0, w, h);

      if (!prefersReducedMotion.matches) {
        animFrameId = requestAnimationFrame(render2D);
      }
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        isVisible = entry.isIntersecting;
        if (isVisible) {
          resize2D();
          cancelAnimationFrame(animFrameId);
          animFrameId = requestAnimationFrame(render2D);
        } else {
          cancelAnimationFrame(animFrameId);
        }
      });
    }, { threshold: 0.05 });

    if (section) observer.observe(section);
  }
})();

// Section 10: Industry Use Case Tab Switcher
const industryTabs = [...document.querySelectorAll('.industry-tab')];
const industryPanels = [...document.querySelectorAll('.industry-panel')];

industryTabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    const targetIndex = tab.dataset.industryTarget;
    industryTabs.forEach((t) => {
      t.classList.toggle('is-active', t === tab);
      t.setAttribute('aria-selected', String(t === tab));
    });
    industryPanels.forEach((panel) => {
      const isActive = panel.dataset.industryPanel === targetIndex;
      panel.classList.toggle('is-active', isActive);
      panel.hidden = !isActive;
    });
  });
});
// Section 06: Minimal Linear-Style Philosophy Quote Scroll Reveal
const quoteSection = document.querySelector('[data-quote-reveal]');
if (quoteSection && 'IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const quoteObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        quoteObserver.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -20% 0px', threshold: 0.35 });

  quoteObserver.observe(quoteSection);
}

// Section 12: Pitch-Style CTA Interactive Glow & Parallax Cards (Matched with Header/Hero Effect)
const interactiveCta = document.querySelector('[data-interactive-cta]');

if (interactiveCta && window.matchMedia('(hover: hover) and (pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const ctaPointerGlow = interactiveCta.querySelector('[data-pointer-glow]');
  const ctaBgElements = interactiveCta.querySelector('.cta-bg-elements');
  const ctaBgCards = [...interactiveCta.querySelectorAll('.cta-bg-card')];
  
  if (ctaPointerGlow && ctaBgElements) {
    let ctaPointerX = 0;
    let ctaPointerY = 0;
    let ctaAnimFrame = 0;
    let ctaLastTrailX = 0;
    let ctaLastTrailY = 0;
    let ctaTrailIndex = 0;

    const ctaTrailPool = Array.from({ length: 16 }, () => {
      const trail = document.createElement('span');
      trail.className = 'trail-glow';
      trail.setAttribute('aria-hidden', 'true');
      ctaBgElements.insertBefore(trail, ctaPointerGlow);
      return trail;
    });

    const releaseCtaTrail = (x, y) => {
      const trail = ctaTrailPool[ctaTrailIndex];
      ctaTrailIndex = (ctaTrailIndex + 1) % ctaTrailPool.length;
      trail.getAnimations().forEach((animation) => animation.cancel());
      trail.animate(
        [
          { opacity: 0.42, transform: `translate3d(${x - 110}px, ${y - 110}px, 0) scale(.95)` },
          { opacity: 0, transform: `translate3d(${x - 110}px, ${y - 110}px, 0) scale(1.12)` }
        ],
        { duration: 900, easing: 'cubic-bezier(.23, 1, .32, 1)', fill: 'both' }
      );
    };

    const paintCtaGlow = () => {
      ctaPointerGlow.style.transform = `translate3d(${ctaPointerX - 310}px, ${ctaPointerY - 310}px, 0)`;

      const bounds = interactiveCta.getBoundingClientRect();
      const relX = (ctaPointerX / bounds.width) - 0.5;
      const relY = (ctaPointerY / bounds.height) - 0.5;

      ctaBgCards.forEach((card) => {
        const speed = parseFloat(card.dataset.parallaxSpeed || '0.04');
        const moveX = relX * speed * 350;
        const moveY = relY * speed * 350;
        card.style.transform = `translate3d(${moveX.toFixed(2)}px, ${moveY.toFixed(2)}px, 0)`;
      });

      ctaAnimFrame = 0;
    };

    interactiveCta.addEventListener('pointerenter', () => {
      interactiveCta.dataset.pointerActive = 'true';
      ctaLastTrailX = ctaPointerX;
      ctaLastTrailY = ctaPointerY;
    });

    interactiveCta.addEventListener('pointermove', (event) => {
      const bounds = interactiveCta.getBoundingClientRect();
      ctaPointerX = event.clientX - bounds.left;
      ctaPointerY = event.clientY - bounds.top;

      const trailDistance = Math.hypot(ctaPointerX - ctaLastTrailX, ctaPointerY - ctaLastTrailY);
      if (trailDistance >= 20) {
        releaseCtaTrail(ctaPointerX, ctaPointerY);
        ctaLastTrailX = ctaPointerX;
        ctaLastTrailY = ctaPointerY;
      }

      if (!ctaAnimFrame) {
        ctaAnimFrame = requestAnimationFrame(paintCtaGlow);
      }
    });

    interactiveCta.addEventListener('pointerleave', () => {
      interactiveCta.dataset.pointerActive = 'false';
      ctaBgCards.forEach((card) => {
        card.style.transform = '';
      });
    });
  }
}


