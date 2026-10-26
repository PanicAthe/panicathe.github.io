from html import escape


def build_home(en, base, path, companions, media):
    def t(ko, english):
        return english if en else ko

    # 히어로: 거대한 의성어가 스스로 타이핑되고, 아쿠아 고양이가 글자 뒤에서 반응한다.
    words = t('타닥타닥|톡톡톡톡|또각또각', 'Tap tap|Clack|Pop pop')
    first_word = words.split('|')[0]

    # 친구 밴드: 컬러 밴드 하나에 친구 한 명. 앱 속 반응 GIF를 같은 밴드에서 바로 재생한다.
    bands = ''
    for kind, name, note in companions:
        bands += f'''<article class="band band-{kind}">
  <div class="band-copy"><h3>{name}</h3><p>{note}</p></div>
  <button class="band-pet" type="button" data-companion-trigger aria-label="{escape(name)} {t('반응 보기', 'play reaction')}"><img src="{base}/assets/reactions/{kind}-poster.png?v=alpha-20261026" data-companion-gif="{base}/assets/reactions/{kind}-reaction.gif?v=alpha-20261026" data-poster="{base}/assets/reactions/{kind}-poster.png?v=alpha-20261026" width="640" height="640" alt="" loading="lazy"></button>
</article>'''

    sound_names = [t('기계식', 'Mechanical'), t('도각도각', 'Soft Thock'), t('윤활 갈축', 'Lubed Brown'), t('청축', 'Blue Switch'), t('버블', 'Bubble'), t('뮤직박스', 'Music box')]
    ticker = ''.join(f'<span>{name}</span><i>✳</i>' for name in sound_names)

    samples = [
        ('mechanical', t('기계식', 'Mechanical'), t('또렷한 키보드의 리듬', 'A crisp keyboard rhythm')),
        ('bubble', t('버블', 'Bubble'), t('톡톡 터지는 작은 즐거움', 'A tiny pop of joy')),
        ('musicbox', t('뮤직박스', 'Music box'), t('가벼운 멜로디 한 조각', 'A little note of melody')),
    ]
    sound_rows = ''.join(f'''<button class="sound-row" type="button" data-sound="{base}/assets/sounds/{key}.wav" aria-label="{name} {t('소리 미리듣기', 'sound preview')}" aria-pressed="false"><span class="sample-copy"><strong>{name}</strong><small>{note}</small></span><span class="sound-wave" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span><span class="play-symbol" aria-hidden="true">▶</span></button>''' for key, name, note in samples)

    steps = [
        (t('메뉴바에서 만나요', 'Meet in the menu bar'), t('TypeCat을 열고 작은 메뉴바 아이콘을 눌러주세요.', 'Open TypeCat, then click its small menu bar icon.')),
        (t('키보드 연결을 허용해요', 'Connect your keyboard'), t('시스템 설정의 입력 모니터링에서 TypeCat을 허용해주세요.', 'Allow TypeCat in System Settings → Privacy & Security → Input Monitoring.')),
        (t('다섯 번 톡톡, 준비 끝', 'Five taps. Ready to go.'), t('환경설정 → 키보드 연결 테스트에서 실제 키를 다섯 번 눌러 확인해요.', 'In Preferences → Test keyboard connection, press five physical keys to confirm delivery.')),
    ]
    setup = ''.join(f'<li><span class="step-no">{i + 1}</span><h3>{title}</h3><p>{note}</p></li>' for i, (title, note) in enumerate(steps))

    return f'''
<section class="hero" aria-labelledby="hero-title">
  <h1 id="hero-title" class="hero-type"><span class="sr-only">{t('타닥타닥, 조금 더 즐겁게.', 'A little joy in every keystroke.')}</span><span class="type-word" aria-hidden="true" data-type-words="{words}">{first_word}</span><span class="caret" aria-hidden="true"></span></h1>
  <button type="button" class="hero-pet" data-pet-tap aria-label="{t('아쿠아 고양이에게 인사하기', 'Say hello to Aqua Cat')}"><img src="{base}/assets/aqua.png" width="1312" height="1199" alt="" fetchpriority="high"><span class="pet-bubble" data-reaction-message aria-live="polite"></span></button>
  <div class="hero-copy">
    <p class="hero-lead">{t('키를 누를 때마다 기분 좋은 소리, 옆에서 같이 치는 작은 친구. Mac 메뉴바에서 바로 켜요.', 'A feel-good sound with every key, and a little friend typing along. It lives in your Mac menu bar.')}</p>
    <div class="hero-actions"><a class="button lemon" href="#companions">{t('친구들 만나기', 'Meet the friends')}</a><a class="button ghost" href="#sound">{t('소리 들어보기', 'Hear the sounds')}</a></div>
    <p class="release-note">{t('macOS 13 이상에서 동작해요. Mac App Store 출시를 준비하고 있어요.', 'Works on macOS 13 or later. Mac App Store release in preparation.')}</p>
  </div>
</section>
<div class="ticker" aria-hidden="true"><div class="ticker-track">{ticker}{ticker}</div></div>

<section id="companions" class="friends-section">
  <div class="section-intro"><h2>{t('같이 치는<br>친구 넷', 'Four friends<br>who type along')}</h2><p>{t('성격도 움직임도 다른 네 친구예요. 모두 무료 버전에 들어 있어요.', 'Four personalities, four little ways to move. All in the free release.')}</p></div>
  {bands}
  <div class="custom-note"><p><strong>{t('내 이미지로 만든 친구도 좋아요.', 'Bring your own friend, too.')}</strong> {t('직접 고른 이미지로 커스텀 캐릭터 1개를 저장할 수 있어요.', 'Save one custom companion from an image you choose.')}</p><a href="{path('support', en)}#custom-files">{t('만드는 방법', 'How it works')}</a></div>
</section>

<section id="sound" class="sound-section">
  <div class="sound-story"><h2>{t('오늘은 어떤<br>소리로 쓸까요?', 'What does your<br>day sound like?')}</h2><p>{t('또각또각, 톡톡, 맑은 멜로디. 키보드·효과음·악기 세 갈래로 12종이 들어 있어요.', 'Crisp clicks, tiny pops, a gentle melody. Twelve themes across keyboards, effects, and instruments.')}</p><p class="sample-disclosure">{t('그중 3종을 들어볼 수 있어요.', 'Three of them are here to try.')}</p></div>
  <div class="sound-player">{sound_rows}<p class="player-status" data-audio-status aria-live="polite"></p></div>
</section>

{media['tour']}

<section id="focus" class="focus-section">
  <div class="focus-story"><h2>{t('몰입할 때도,<br>쉬어갈 때도', 'A little focus,<br>a little rest')}</h2><p>{t('카운트다운과 뽀모도로를 메뉴바에서 가볍게. 남은 시간은 친구 바로 아래에 보여요.', 'Countdowns and Pomodoro, right from the menu bar. The time left sits just below your companion.')}</p><ul class="quiet-list"><li>{t('시작·일시정지·초기화를 한 번에', 'Start, pause, and reset in one place')}</li><li>{t('완료 알림음과 볼륨은 따로 조절', 'Separate sound and volume for timer alerts')}</li><li>{t('다시 열면 저장된 남은 시간부터', 'Pick up your saved time after relaunch')}</li></ul><a class="text-link" href="{path('support', en)}#timer-help">{t('타이머 사용 안내', 'Timer guide')}</a></div>
  <div class="timer-preview"><div class="timer-content"><span class="timer-mode">{t('집중할 시간', 'Time to focus')}</span><p class="timer-readout" data-timer-readout>25:00</p><div class="timer-actions"><button class="button lemon" type="button" data-timer-toggle>{t('시작', 'Start')}</button><button class="reset-timer" type="button" data-timer-reset>{t('초기화', 'Reset')}</button></div><p class="timer-note">{t('웹에서 눌러보는 미리보기예요.', 'A preview you can try on the web.')}</p></div><img src="{base}/assets/companions/cat.png" width="512" height="512" alt="" loading="lazy"></div>
</section>

<section class="privacy-note"><h2>{t('입력한 문장은,<br>당신의 것', 'Your words<br>stay yours')}</h2><div><p>{t('키의 종류와 타이밍만 Mac 안에서 잠깐 처리해요. 입력한 문자나 문장은 추출·저장·전송하지 않아요.', 'Only key categories and timing are processed, briefly, on your Mac. Typed characters and sentences are never extracted, stored, or transmitted.')}</p><a class="text-link" href="{path('privacy', en)}">{t('개인정보처리방침 읽기', 'Read the privacy policy')}</a></div></section>

<section id="start" class="start-section">
  <div class="section-intro"><h2>{t('세 단계면<br>준비 끝', 'Three steps<br>and you are set')}</h2><p>{t('권한 안내부터 실제 입력 확인까지, 첫 실행 화면이 차근차근 안내해요.', 'From the permission prompt to the five-key test, the first launch walks you through it.')}</p></div>
  <ol class="start-steps">{setup}</ol>
  <div class="onboarding-shots">{media['onboarding']}</div>
  <p class="setup-note">{t('시스템의 권한 스위치와 실제 입력 전달은 달라요. 위 화면은 시작 안내 미리보기이고, 연결은 앱에서 실제 키를 다섯 번 눌러 확인해요.', 'A permission toggle is not the same as input actually arriving. These are first-launch previews; the real check is five physical key presses in the app.')}</p>
  <a class="button ink" href="{path('support', en)}">{t('처음 사용하기 안내', 'Getting started guide')}</a>
</section>
'''
