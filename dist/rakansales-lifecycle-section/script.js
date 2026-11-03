/**
 * RakanSales - Section 07: Scroll-Triggered Lifecycle Stages
 * Pinned viewport on desktop; progress rail with proportional distance filling.
 */
(() => {
  const workflowScroll = document.querySelector('[data-workflow-scroll]');
  if (!workflowScroll) return;

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
      if (i === index) {
        step.setAttribute('aria-current', 'step');
      } else {
        step.removeAttribute('aria-current');
      }
    });
  };

  const getScrollable = () => workflowScroll.offsetHeight - window.innerHeight;
  const stageBars = stageSteps.map((step) => step.querySelector('.workflow-progress__bar'));

  // Each bar fills in proportion to how far the reader has scrolled through its stage
  const setStageFill = (progress) => {
    const scaled = progress * stageCards.length;
    stageBars.forEach((bar, i) => {
      if (bar) {
        bar.style.setProperty('--fill', Math.min(Math.max(scaled - i, 0), 1).toFixed(4));
      }
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

  const applyStageMode = () => {
    const pinned = pinQuery.matches;
    workflowScroll.classList.toggle('is-scroll-driven', pinned);
    activeStage = -1;
    if (pinned) {
      updateStage();
    } else {
      stageCards.forEach((card) => {
        card.classList.remove('is-active', 'is-past');
        card.inert = false;
      });
    }
  };

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
      if (!stageTicking) {
        stageTicking = true;
        window.requestAnimationFrame(updateStage);
      }
    },
    { passive: true }
  );

  window.addEventListener('resize', updateStage, { passive: true });
  pinQuery.addEventListener('change', applyStageMode);
  applyStageMode();
})();
