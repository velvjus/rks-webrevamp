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

// Video Modal Trigger and Controls
const videoTriggers = document.querySelectorAll('[data-video-trigger]');
const chapterChips = document.querySelectorAll('.chapter-chip[data-video-start]');
const videoModal = document.getElementById('videoModal');
const videoIframe = document.getElementById('videoIframe');
const videoCloseButtons = document.querySelectorAll('[data-video-close]');
const YOUTUBE_VIDEO_BASE = 'https://www.youtube.com/embed/ukIm5NKqZ9E?autoplay=1&rel=0&playsinline=1&modestbranding=1&enablejsapi=1';
let lastFocusedElement = null;

function openVideoModal(startTime = 0) {
  if (!videoModal || !videoIframe) return;
  lastFocusedElement = document.activeElement;
  const startSec = parseInt(startTime, 10) || 0;
  videoIframe.src = startSec > 0 ? `${YOUTUBE_VIDEO_BASE}&start=${startSec}` : YOUTUBE_VIDEO_BASE;
  videoModal.classList.add('is-active');
  videoModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  // Highlight active chapter
  chapterChips.forEach((chip) => {
    const chipTime = parseInt(chip.dataset.videoStart || '0', 10);
    chip.classList.toggle('is-active', chipTime === startSec);
  });

  // Focus modal close button for keyboard accessibility
  const closeBtn = videoModal.querySelector('.video-modal__close');
  if (closeBtn) setTimeout(() => closeBtn.focus(), 50);
}

function closeVideoModal() {
  if (!videoModal || !videoIframe) return;
  videoModal.classList.remove('is-active');
  videoModal.setAttribute('aria-hidden', 'true');
  videoIframe.src = '';
  document.body.style.overflow = '';
  if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
    lastFocusedElement.focus();
  }
}

videoTriggers.forEach((trigger) => {
  trigger.addEventListener('click', (event) => {
    event.preventDefault();
    openVideoModal(0);
  });
  trigger.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openVideoModal(0);
    }
  });
});

chapterChips.forEach((chip) => {
  chip.addEventListener('click', (event) => {
    event.preventDefault();
    const start = chip.dataset.videoStart || 0;
    openVideoModal(start);
  });
});

videoCloseButtons.forEach((btn) => {
  btn.addEventListener('click', closeVideoModal);
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && videoModal && videoModal.classList.contains('is-active')) {
    closeVideoModal();
  }
});

// Section 07: 5-Step Continuous Workflow Tabs with Progress Bars and Auto-Switching
const workflowSection = document.querySelector('.workflow-section');
const workflowTabs = [...document.querySelectorAll('.workflow-tab')];
const workflowSlides = [...document.querySelectorAll('.workflow-slide')];

if (workflowSection && workflowTabs.length && workflowSlides.length) {
  const STEP_DURATION = 5000; // 5 seconds per lifecycle step
  let currentWorkflowIndex = 0;
  let workflowTimer = null;
  let isSectionHovered = false;
  let isSectionInView = true;
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const resetProgressBarAnimation = (tab) => {
    const bar = tab.querySelector('.workflow-tab__progress-bar') || tab.querySelector('.step-progress-bar');
    if (bar) {
      bar.style.animation = 'none';
      void bar.offsetHeight; // trigger reflow
      bar.style.animation = '';
    }
  };

  const switchWorkflowStep = (index, userInitiated = false) => {
    currentWorkflowIndex = (index + workflowTabs.length) % workflowTabs.length;

    workflowTabs.forEach((tab, i) => {
      const isActive = i === currentWorkflowIndex;
      const isPassed = i < currentWorkflowIndex;
      tab.classList.toggle('is-active', isActive);
      tab.classList.toggle('is-passed', isPassed);
      tab.setAttribute('aria-selected', String(isActive));
      tab.setAttribute('tabindex', isActive ? '0' : '-1');
      if (isActive) {
        resetProgressBarAnimation(tab);
      }
    });

    workflowSlides.forEach((slide) => {
      const isActive = Number(slide.dataset.stepSlide) === currentWorkflowIndex;
      slide.classList.toggle('is-active', isActive);
      slide.hidden = !isActive;
    });

    if (userInitiated) {
      workflowTabs[currentWorkflowIndex].focus();
    }

    startWorkflowTimer();
  };

  const clearWorkflowTimer = () => {
    if (workflowTimer) {
      clearTimeout(workflowTimer);
      workflowTimer = null;
    }
  };

  const startWorkflowTimer = () => {
    clearWorkflowTimer();
    if (prefersReducedMotion.matches || !isSectionInView) {
      return;
    }
    workflowTimer = setTimeout(() => {
      switchWorkflowStep(currentWorkflowIndex + 1);
    }, STEP_DURATION);
  };

  // Tab click and keyboard navigation
  workflowTabs.forEach((tab, index) => {
    tab.addEventListener('click', () => {
      switchWorkflowStep(index);
    });

    tab.addEventListener('keydown', (event) => {
      let nextIndex = null;
      if (event.key === 'ArrowRight' || event.key === 'ArrowDown') {
        event.preventDefault();
        nextIndex = (currentWorkflowIndex + 1) % workflowTabs.length;
      } else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') {
        event.preventDefault();
        nextIndex = (currentWorkflowIndex - 1 + workflowTabs.length) % workflowTabs.length;
      } else if (event.key === 'Home') {
        event.preventDefault();
        nextIndex = 0;
      } else if (event.key === 'End') {
        event.preventDefault();
        nextIndex = workflowTabs.length - 1;
      }

      if (nextIndex !== null) {
        switchWorkflowStep(nextIndex, true);
      }
    });
  });

  // IntersectionObserver to auto-play only when in view
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isSectionInView = entry.isIntersecting;
          if (entry.isIntersecting) {
            startWorkflowTimer();
          } else {
            clearWorkflowTimer();
          }
        });
      },
      { threshold: 0.2 }
    );
    observer.observe(workflowSection);
  } else {
    startWorkflowTimer();
  }

  // Handle prefers-reduced-motion changes
  prefersReducedMotion.addEventListener('change', () => {
    if (prefersReducedMotion.matches) {
      clearWorkflowTimer();
    } else {
      startWorkflowTimer();
    }
  });

  // Initialize initial state
  switchWorkflowStep(0);
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


