(() => {
  const english = document.documentElement.lang === 'en';
  const say = (ko, en) => english ? en : ko;
  const showcase = document.querySelector('.hero-showcase');
  let reactionTimeout;
  function react() {
    if (!showcase) return;
    clearTimeout(reactionTimeout);
    showcase.classList.remove('is-reacting');
    // Restart the finite animation for each deliberate button press.
    void showcase.offsetWidth;
    showcase.classList.add('is-reacting');
    showcase.querySelector('[data-reaction-message]').textContent = say('반가워요! ♡', 'Hello there! ♡');
    reactionTimeout = setTimeout(() => {
      showcase.classList.remove('is-reacting');
      showcase.querySelector('[data-reaction-message]').textContent = '';
    }, 1300);
  }
  document.querySelectorAll('[data-friend]').forEach(button => {
    button.addEventListener('click', () => {
      document.querySelectorAll('[data-friend]').forEach(choice => choice.setAttribute('aria-pressed', String(choice === button)));
      const image = document.querySelector('#hero-pet-image');
      image.src = button.dataset.src;
      image.alt = button.dataset.name;
      showcase.dataset.kind = button.dataset.friend;
      showcase.querySelector('[data-friend-name]').textContent = button.dataset.name;
      showcase.querySelector('[data-friend-note]').textContent = button.dataset.note;
      react();
    });
  });
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
        audioStatus.textContent = say('다른 소리도 들어보세요.', 'Try another sound.');
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
    toggle.textContent = remaining === 0 ? say('다시 시작 ↗', 'Start again ↗') : say('시작 ↗', 'Start ↗');
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
      toggle.textContent = say('일시정지 Ⅱ', 'Pause Ⅱ');
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
      const src = `/typecat/assets/screens/${screen}-${tour.dataset.mediaLocale}-${theme}.webp`;
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
  const reactionTimers = new Map();
  function stopReaction(button) {
    clearTimeout(reactionTimers.get(button));
    reactionTimers.delete(button);
    const image = button.closest('.reaction-card').querySelector('[data-reaction-image]');
    image.src = image.dataset.poster;
    button.setAttribute('aria-pressed', 'false');
    button.innerHTML = `<span aria-hidden="true">↻</span> ${say('반응 보기', 'Play reaction')}`;
  }
  document.querySelectorAll('[data-play-reaction]').forEach(button => {
    button.setAttribute('aria-pressed', 'false');
    button.addEventListener('click', () => {
      if (reactionTimers.has(button)) { stopReaction(button); return; }
      const image = button.closest('.reaction-card').querySelector('[data-reaction-image]');
      image.src = image.dataset.gif + `?play=${Date.now()}`;
      button.setAttribute('aria-pressed', 'true');
      button.innerHTML = `<span aria-hidden="true">Ⅱ</span> ${say('멈추기', 'Stop')}`;
      reactionTimers.set(button, setTimeout(() => stopReaction(button), 3000));
    });
  });
  window.addEventListener('pagehide', () => {
    [...reactionTimers.keys()].forEach(stopReaction);
  });

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
