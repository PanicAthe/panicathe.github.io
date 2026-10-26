(() => {
  const english = document.documentElement.lang === 'en';
  const say = (ko, en) => english ? en : ko;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Hero: the onomatopoeia types itself, one word at a time.
  const typed = document.querySelector('[data-type-words]');
  if (typed && !reduceMotion) {
    const words = typed.dataset.typeWords.split('|');
    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));
    let index = 0;
    (async () => {
      for (;;) {
        await sleep(2600);
        if (document.hidden) continue;
        const current = [...words[index]];
        for (let i = current.length; i >= 0; i--) { typed.textContent = current.slice(0, i).join(''); await sleep(70); }
        index = (index + 1) % words.length;
        const next = [...words[index]];
        for (let i = 1; i <= next.length; i++) { typed.textContent = next.slice(0, i).join(''); await sleep(140); }
      }
    })();
  }

  // Hero: tap Aqua Cat for a squish and a hello.
  const pet = document.querySelector('.hero-pet');
  let reactionTimeout;
  function react() {
    if (!pet) return;
    clearTimeout(reactionTimeout);
    pet.classList.remove('is-reacting');
    // Restart the finite animation for each deliberate press.
    void pet.offsetWidth;
    pet.classList.add('is-reacting');
    pet.querySelector('[data-reaction-message]').textContent = say('반가워요! ♡', 'Hello there! ♡');
    reactionTimeout = setTimeout(() => {
      pet.classList.remove('is-reacting');
      pet.querySelector('[data-reaction-message]').textContent = '';
    }, 1300);
  }
  document.querySelectorAll('[data-pet-tap]').forEach(button => button.addEventListener('click', react));

  let player;
  let activeSound;
  const audioStatus = document.querySelector('[data-audio-status]');
  function resetSound() {
    if (activeSound) {
      activeSound.setAttribute('aria-pressed', 'false');
      activeSound.querySelector('.play-symbol').textContent = '▶';
    }
    activeSound = null;
  }
  document.querySelectorAll('[data-sound]').forEach(button => {
    button.addEventListener('click', async () => {
      const wasPlaying = activeSound === button;
      if (player) player.pause();
      resetSound();
      if (wasPlaying) {
        audioStatus.textContent = say('재생을 멈췄어요.', 'Playback paused.');
        return;
      }
      player = new Audio(button.dataset.sound);
      player.volume = 0.65;
      activeSound = button;
      button.setAttribute('aria-pressed', 'true');
      button.querySelector('.play-symbol').textContent = 'Ⅱ';
      const label = button.querySelector('strong').textContent;
      audioStatus.textContent = say(`${label} 소리를 듣고 있어요.`, `Playing ${label}.`);
      player.addEventListener('ended', () => {
        resetSound();
        audioStatus.textContent = say('재생 완료', 'Playback complete');
      }, { once: true });
      try {
        await player.play();
      } catch {
        // A later selection may interrupt play; keep that newer selection intact.
        if (activeSound !== button) return;
        resetSound();
        audioStatus.textContent = say('재생할 수 없어요. 다시 눌러주세요.', 'Could not play this sample. Please try again.');
      }
    });
  });

  const toggle = document.querySelector('[data-timer-toggle]');
  const readout = document.querySelector('[data-timer-readout]');
  let remaining = 25 * 60;
  let timer;
  let deadline;
  function drawTimer() {
    readout.textContent = `${String(Math.floor(remaining / 60)).padStart(2, '0')}:${String(remaining % 60).padStart(2, '0')}`;
  }
  function pauseTimer() {
    clearInterval(timer);
    timer = null;
    toggle.removeAttribute('aria-label');
    toggle.textContent = remaining === 0 ? say('다시 시작', 'Start again') : say('시작', 'Start');
  }
  if (toggle) {
    toggle.addEventListener('click', () => {
      if (timer) {
        remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
        pauseTimer();
        drawTimer();
        return;
      }
      if (remaining === 0) remaining = 25 * 60;
      deadline = Date.now() + remaining * 1000;
      toggle.textContent = say('일시정지', 'Pause');
      toggle.setAttribute('aria-label', say('미리보기 타이머 일시정지', 'Pause preview timer'));
      timer = setInterval(() => {
        remaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
        drawTimer();
        if (remaining === 0) pauseTimer();
      }, 250);
    });
    document.querySelector('[data-timer-reset]').addEventListener('click', () => {
      pauseTimer();
      remaining = 25 * 60;
      drawTimer();
    });
  }
  window.addEventListener('pagehide', () => {
    if (player) player.pause();
    resetSound();
    if (toggle) pauseTimer();
  });

  const tour = document.querySelector('[data-media-locale]');
  if (tour) {
    let screen = 'sound';
    let appearance = 'light';
    const choices = [...tour.querySelectorAll('[data-screen]')];
    function updateScreen() {
      const choice = choices.find(button => button.dataset.screen === screen);
      const lightOnly = ['menu-timer', 'timer-config'].includes(screen);
      const theme = lightOnly ? 'light' : appearance;
      const isMenu = screen === "menu" || screen === "menu-timer";
      const extension = isMenu ? "png" : "webp";
      const src = `/typecat/assets/screens/${screen}-${tour.dataset.mediaLocale}-${theme}.${extension}?v=retina-20261026`;
      tour.querySelector("[data-screen-full]").dataset.screenKind = isMenu ? "menu" : "settings";
      const image = tour.querySelector('[data-screen-image]');
      image.src = src;
      image.alt = `TypeCat ${choice.dataset.title}`;
      tour.querySelector('[data-screen-full]').href = src;
      tour.querySelector('[data-screen-full]').dataset.appearance = theme;
      tour.querySelector('[data-screen-title]').textContent = choice.dataset.title;
      tour.querySelector('[data-screen-caption]').textContent = choice.dataset.caption;
      tour.querySelector('[data-screen-count]').textContent = `${String(choices.indexOf(choice) + 1).padStart(2, '0')} / ${String(choices.length).padStart(2, '0')}`;
      choices.forEach(button => button.setAttribute('aria-pressed', String(button === choice)));
      tour.querySelectorAll('[data-screen-theme]').forEach(button => {
        button.setAttribute('aria-pressed', String(button.dataset.screenTheme === theme));
        button.disabled = lightOnly && button.dataset.screenTheme === 'dark';
      });
    }
    choices.forEach(button => button.addEventListener('click', () => {
      screen = button.dataset.screen;
      updateScreen();
    }));
    tour.querySelectorAll('[data-screen-theme]').forEach(button => button.addEventListener('click', () => {
      appearance = button.dataset.screenTheme;
      updateScreen();
    }));
  }
  // Characters rest until a deliberate hover, click, or keyboard activation.
  const motionPreference = window.matchMedia('(prefers-reduced-motion: reduce)');
  const companionStops = new Map();
  document.querySelectorAll('[data-companion-trigger]').forEach(button => {
    const image = button.querySelector('[data-companion-gif]');
    let hovered = false;
    let clicked = false;
    let timeout;
    function refresh() {
      const playing = !document.hidden && (clicked || (hovered && !motionPreference.matches));
      const src = playing ? image.dataset.companionGif : image.dataset.poster;
      if (image.getAttribute('src') !== src) image.src = src;
    }
    function stop() {
      clearTimeout(timeout);
      hovered = clicked = false;
      refresh();
    }
    button.addEventListener('pointerenter', event => {
      if (event.pointerType === 'touch') return;
      hovered = true;
      refresh();
    });
    button.addEventListener('pointerleave', () => { hovered = false; refresh(); });
    button.addEventListener('click', () => {
      clicked = true;
      clearTimeout(timeout);
      refresh();
      timeout = setTimeout(() => { clicked = false; refresh(); }, 3000);
    });
    button.addEventListener('blur', stop);
    companionStops.set(button, stop);
  });
  const companionObserver = new IntersectionObserver(entries => {
    entries.forEach(({ target, isIntersecting }) => {
      if (!isIntersecting) companionStops.get(target)();
    });
  });
  companionStops.forEach((_stop, button) => companionObserver.observe(button));
  motionPreference.addEventListener('change', () => companionStops.forEach(stop => stop()));
  document.addEventListener('visibilitychange', () => {
    if (document.hidden) companionStops.forEach(stop => stop());
  });
  window.addEventListener('pagehide', () => companionStops.forEach(stop => stop()));

  function openLinkedHelp() {
    const id = decodeURIComponent(window.location.hash.slice(1));
    const section = document.getElementById(id);
    if (section?.matches('details')) section.open = true;
  }
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', () => {
      const target = document.getElementById(link.hash.slice(1));
      if (target?.matches('details')) target.open = true;
    });
  });
  openLinkedHelp();
  window.addEventListener('hashchange', openLinkedHelp);
})();
