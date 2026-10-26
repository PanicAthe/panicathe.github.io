from html import escape


def build_home(en, base, path, paw, companions):
    def t(ko, english):
        return english if en else ko

    thumbs = ''
    cards = ''
    for index, (kind, name, note) in enumerate(companions):
        src = f'{base}/assets/companions/{kind}.png'
        hero_src = f'{base}/assets/aqua.png' if kind == 'aqua-cat' else src
        thumbs += f'''<button class="friend-choice" type="button" data-friend="{kind}" data-name="{escape(name)}" data-note="{escape(note)}" data-src="{hero_src}" aria-pressed="{'true' if index == 0 else 'false'}" aria-label="{escape(name)} {t('미리보기', 'preview')}"><img src="{src}" width="512" height="512" alt=""><span>{name}</span></button>'''
        cards += f'''<article class="friend-profile friend-{kind}"><div class="friend-picture"><span class="profile-number">0{index + 1}</span><img src="{src}" width="512" height="512" alt="{name}" loading="lazy"></div><div class="profile-copy"><h3>{name}</h3><p>{note}</p></div></article>'''

    samples = [
        ('mechanical', t('기계식', 'Mechanical'), t('또렷한 키보드의 리듬', 'A crisp keyboard rhythm'), '01'),
        ('bubble', t('버블', 'Bubble'), t('톡톡 터지는 작은 즐거움', 'A tiny pop of joy'), '02'),
        ('musicbox', t('뮤직박스', 'Music box'), t('가벼운 멜로디 한 조각', 'A little note of melody'), '03'),
    ]
    sound_rows = ''.join(f'''<button class="sound-row" type="button" data-sound="{base}/assets/sounds/{key}.wav" aria-label="{name} {t('소리 미리듣기', 'sound preview')}" aria-pressed="false"><span class="sample-index">{number}</span><span class="sample-copy"><strong>{name}</strong><small>{note}</small></span><span class="sound-wave" aria-hidden="true"><i></i><i></i><i></i><i></i><i></i></span><span class="play-symbol" aria-hidden="true">▶</span></button>''' for key, name, note, number in samples)

    steps = [
        (t('메뉴바에서 만나요', 'Meet in the menu bar'), t('TypeCat을 열고 작은 메뉴바 아이콘을 눌러주세요.', 'Open TypeCat, then click its small menu bar icon.')),
        (t('키보드 연결을 허용해요', 'Connect your keyboard'), t('시스템 설정의 입력 모니터링에서 TypeCat을 허용해주세요.', 'Allow TypeCat in System Settings → Privacy & Security → Input Monitoring.')),
        (t('다섯 번 톡톡, 준비 끝', 'Five taps. Ready to go.'), t('환경설정 → 키보드 연결 테스트에서 실제 키를 다섯 번 눌러 확인해요.', 'In Preferences → Test keyboard connection, press five physical keys to confirm delivery.')),
    ]
    setup = ''.join(f'<li><span>0{i + 1}</span><div><h3>{title}</h3><p>{note}</p></div></li>' for i, (title, note) in enumerate(steps))

    return f'''
<section class="hero" aria-labelledby="hero-title">
  <div class="hero-copy">
    <p class="edition-label"><span></span> {t('MAC을 위한 작은 친구', 'A LITTLE COMPANION FOR YOUR MAC')}</p>
    <h1 id="hero-title" class="hero-title">{t('타닥타닥,<br><em>조금 더 즐겁게.</em>', 'A little joy.<br><em>Every keystroke.</em>')}</h1>
    <p class="hero-intro">{t('기분 좋은 소리, 곁에 있는 작은 친구.<br>매일의 타이핑에 나만의 리듬을 더해요.', 'Feel-good sounds. A little friend by your side.<br>Make your everyday typing a little more yours.')}</p>
    <div class="hero-actions">{paw}<div class="action-note"><span class="platform-mark" aria-hidden="true">⌘</span><strong>{t('가볍게, 메뉴바에서', 'Right in your menu bar')}</strong><span>macOS 13+</span><a href="#app">{t('실제 앱 둘러보기', 'Take an app tour')} <span aria-hidden="true">↗</span></a></div></div>
    <p class="release-note"><span></span>{t('Mac App Store 출시 준비 중', 'Mac App Store release in preparation')}</p>
  </div>
  <div class="hero-showcase" data-kind="aqua-cat">
    <div class="showcase-top"><span>{t('오늘의 작은 친구', 'YOUR LITTLE COMPANION')}</span><span class="preview-tag">{t('미리보기', 'PREVIEW')}</span></div>
    <div class="pet-stage"><div class="stage-orbit" aria-hidden="true"></div><span class="stage-spark spark-one" aria-hidden="true">✳</span><span class="stage-spark spark-two" aria-hidden="true">+</span><button type="button" class="pet-tap" data-pet-tap aria-label="{t('캐릭터 반응 미리보기', 'Preview companion reaction')}"><img id="hero-pet-image" src="{base}/assets/aqua.png" width="1312" height="1199" alt="{t('아쿠아 고양이', 'Aqua Cat')}" fetchpriority="high"></button><button class="enter-key" type="button" data-pet-tap aria-label="{t('눌러서 캐릭터와 인사하기', 'Tap to say hello to your companion')}"><span aria-hidden="true">↵</span><small>{t('눌러봐요', 'TAP ME')}</small></button></div>
    <div class="showcase-caption"><strong data-friend-name>{t('아쿠아 고양이', 'Aqua Cat')}</strong><span data-friend-note>{t('몽글몽글, 오팔빛 작은 친구.', 'Soft, opal, and a little squishy.')}</span><span class="reaction-message" data-reaction-message aria-live="polite"></span></div>
    <div class="friend-choices" role="group" aria-label="{t('캐릭터 미리보기 선택', 'Choose a companion preview')}">{thumbs}</div>
  </div>
</section>

<div class="product-facts"><span><b>04</b> {t('함께할 친구', 'little companions')}</span><span><b>12</b> {t('기분 좋은 소리', 'feel-good sounds')}</span><span><b>100%</b> {t('Mac 안에서 처리', 'processed on your Mac')}</span><a href="#companions">{t('아래로, 조금 더', 'A little more below')} <span aria-hidden="true">↓</span></a></div>

<section id="companions" class="section companions-section">
  <div class="section-heading"><div><p class="kicker">01 / LITTLE COMPANY</p><h2>{t('누가 곁에<br>있으면 좋을까요?', 'Who would you like<br>by your side?')}</h2></div><p>{t('성격도, 반응도 다른 네 친구.<br>모두 무료 버전에서 만날 수 있어요.', 'Four little personalities. Four different reactions.<br>All included in the free release.')}</p></div>
  <div class="friend-profiles">{cards}</div>
  <div class="custom-note"><span class="plus-circle" aria-hidden="true">+</span><p><strong>{t('내 이미지로 만든 친구도 좋아요.', 'Your own little creation is welcome, too.')}</strong><span>{t('직접 고른 이미지로 커스텀 캐릭터 1개를 저장할 수 있어요.', 'Save one custom companion using an image you choose.')}</span></p><a href="{path('support', en)}#custom-files">{t('만드는 방법', 'How it works')} ↗</a></div>
</section>

<section id="sound" class="section sound-section">
  <div class="sound-story"><p class="kicker">02 / FIND YOUR RHYTHM</p><h2>{t('오늘은 어떤<br><em>소리로 쓸까요?</em>', 'What does your<br><em>day sound like?</em>')}</h2><p>{t('또각또각, 톡톡, 맑은 멜로디.', 'Crisp clicks, tiny pops, a gentle melody.')}</p><div class="sound-tags"><span>{t('키보드', 'Keyboard')}</span><span>{t('효과음', 'Effects')}</span><span>{t('악기', 'Instruments')}</span></div><p class="sample-disclosure">{t('기본 12종 중 3종의 소리 미리듣기', 'Preview 3 of the 12 bundled themes')}</p></div>
  <div class="sound-player"><div class="player-label"><span>TYPECAT SOUND LIBRARY</span><span class="tiny-dot"></span></div>{sound_rows}<p class="player-status" data-audio-status aria-live="polite"></p><a class="credits-link" href="{base}/sound-credits.txt">{t('음원 출처와 라이선스', 'Sound credits & licenses')} ↗</a></div>
</section>

<section id="focus" class="section focus-section">
  <div class="timer-preview"><div class="window-bar"><span aria-hidden="true"><i></i><i></i><i></i></span><strong>TypeCat</strong><span class="preview-tag">{t('웹 미리보기', 'WEB PREVIEW')}</span></div><div class="timer-content"><span class="timer-mode">{t('집중할 시간', 'TIME TO FOCUS')}</span><p class="timer-readout" data-timer-readout>25:00</p><div class="timer-actions"><button class="button" type="button" data-timer-toggle>{t('시작', 'Start')} <span aria-hidden="true">↗</span></button><button class="reset-timer" type="button" data-timer-reset>{t('초기화', 'Reset')}</button></div><img src="{base}/assets/companions/cat.png" width="512" height="512" alt="" loading="lazy"></div></div>
  <div class="focus-story"><p class="kicker">03 / A MOMENT FOR FOCUS</p><h2>{t('몰입할 때도,<br>쉬어갈 때도.', 'A little focus.<br>A little breathing room.')}</h2><p>{t('타이머와 뽀모도로를 메뉴바에서 가볍게.<br>친구 아래에 남은 시간이 표시돼요.', 'A countdown or Pomodoro, right in your menu bar.<br>Your companion keeps the remaining time close.')}</p><ul class="quiet-list"><li>{t('시작·일시정지·초기화를 간단하게', 'Start, pause, and reset with ease')}</li><li>{t('완료 알림음과 볼륨은 따로 조절', 'Separate sound and volume for timer alerts')}</li><li>{t('다시 열면 저장된 남은 시간부터', 'Resume your saved remaining time after relaunch')}</li></ul><a class="text-link" href="{path('support', en)}#timer-help">{t('타이머 사용 안내', 'Timer guide')} ↗</a></div>
</section>

<section class="privacy-note"><span class="privacy-mark" aria-hidden="true">⌁</span><div><p class="kicker">JUST BETWEEN YOU & YOUR MAC</p><h2>{t('입력한 문장은,<br>당신의 것.', 'Your words<br>stay yours.')}</h2></div><div><p>{t('키의 종류와 타이밍만 일시적으로 처리해요.<br>입력한 문자나 문장은 추출·저장·전송하지 않아요.', 'Only key categories and timing are processed temporarily.<br>Typed characters and sentences are not extracted, stored, or transmitted.')}</p><a class="text-link" href="{path('privacy', en)}">{t('개인정보처리방침', 'Read the privacy policy')} ↗</a></div></section>

<section class="section start-section"><div class="section-heading"><div><p class="kicker">READY WHEN YOU ARE</p><h2>{t('세 단계면,<br>준비 끝.', 'Three little steps.<br>Ready to go.')}</h2></div><a class="button secondary" href="{path('support', en)}">{t('처음 사용하기', 'Getting started')} ↗</a></div><ol class="start-steps">{setup}</ol><p class="setup-note">{t('시스템의 권한 스위치와 실제 입력 전달은 달라요. 앱의 다섯 번 입력 테스트로 연결을 확인해주세요.', 'A permission toggle and actual input delivery are different. Confirm the connection with the app’s five-press test.')}</p></section>
'''
