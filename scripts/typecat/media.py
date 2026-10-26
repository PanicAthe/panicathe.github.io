from html import escape


def build_media(en, base):
    def t(ko, eng):
        return eng if en else ko

    locale = 'en' if en else 'ko'
    screens = [
        ('menu', '메뉴바', 'Menu bar', '켜기·볼륨·친구 선택을 작은 패널 하나에서.', 'Quick access to sound, volume, and your companion.'),
        ('sound', '소리', 'Sounds', '분류와 검색으로 고르고, 선택을 바꾸지 않고 미리 들어요.', 'Browse, search, and audition a sound before selecting it.'),
        ('characters', '캐릭터', 'Companions', '네 친구와 타이핑 반응, 표시 크기를 한곳에서.', 'Four friends, reaction controls, and companion size in one place.'),
        ('timer', '타이머', 'Timer', '집중 시간과 쉬는 시간, 알림을 내 리듬에 맞춰요.', 'Set focus time, breaks, and alerts for your rhythm.'),
        ('preferences', '환경설정', 'Preferences', '테두리·색상·언어와 키보드 연결을 관리해요.', 'Manage appearance, language, and your keyboard connection.'),
        ('custom-character', '캐릭터 편집기', 'Image editor', '내 이미지로 나만의 친구를 만드는 곳.', 'Make a little companion from your own image.'),
        ('custom-sound', '음원 편집기', 'Sound editor', '음원을 가져오고 키별 소리를 구성해요.', 'Import audio and build your own key sounds.'),
        ('timer-config', '뽀모도로 설정', 'Pomodoro setup', '집중·휴식 시간과 알림을 설정해요.', 'Set focus time, breaks, and alerts.'),
        ('menu-timer', '집중 중 메뉴바', 'Focus controls', '남은 시간과 시작·정지를 메뉴바에서 간단하게.', 'Keep the remaining time and timer controls close.'),
    ]
    choices = ''.join(f'<button class="screen-choice" type="button" data-screen="{key}" data-title="{escape(t(ko,eng))}" data-caption="{escape(t(note,en_note))}" aria-pressed="{str(i == 1).lower()}">{t(ko,eng)}</button>' for i,(key,ko,eng,note,en_note) in enumerate(screens))
    setup = [('welcome','처음 인사','Welcome'),('permission','권한 안내','Permission guide'),('waiting','연결 준비','Connection setup'),('keyboard-test','다섯 번 입력 테스트','Five-press test')]
    setup_images = ''.join(f'<figure><a href="{base}/assets/screens/{key}-{locale}-light.webp" target="_blank" rel="noopener" aria-label="{escape(t(ko,eng))} — {t("큰 화면으로 보기, 새 탭", "open full image in a new tab")}"><img src="{base}/assets/screens/{key}-{locale}-light.webp" width="1040" height="1120" loading="lazy" alt="TypeCat {escape(t(ko,eng))}"></a><figcaption><span>0{i+1}</span>{t(ko,eng)} <span aria-hidden="true">↗</span></figcaption></figure>' for i,(key,ko,eng) in enumerate(setup))
    reactions = [('aqua-cat','아쿠아 고양이','Aqua Cat','클릭하면 말랑하게','A little click, a little squish'),('cat','고양이','Cat','작은 앞발로 타닥타닥','Tiny typing paws'),('dog','강아지','Dog','신나게 함께 타이핑','A cheerful typing buddy'),('hamster','햄스터','Hamster','쳇바퀴 위로 총총','A tiny wheel runner')]
    gifs = ''.join(f'<article class="reaction-card"><div class="reaction-picture"><img src="{base}/assets/reactions/{key}-poster.png" data-reaction-image data-poster="{base}/assets/reactions/{key}-poster.png" data-gif="{base}/assets/reactions/{key}-reaction.gif" width="320" height="320" loading="lazy" alt="{escape(t(ko,eng))} {t("반응 미리보기", "reaction preview")}"><span class="gif-label">GIF / 3 SEC</span></div><div class="reaction-copy"><h3>{t(ko,eng)}</h3><p>{t(note,en_note)}</p><button type="button" data-play-reaction aria-label="{escape(t(ko,eng))} {t("반응 보기", "play reaction")}"><span aria-hidden="true">↻</span> {t("반응 보기", "Play reaction")}</button></div></article>' for key,ko,eng,note,en_note in reactions)
    return f'''
<section id="app" class="section app-section" data-media-locale="{locale}">
  <div class="section-heading"><div><p class="kicker">A CLOSER LOOK / THE REAL APP</p><h2>{t('앱 안에서는,<br>이렇게 만나요.', 'A little look<br>inside TypeCat.')}</h2></div><p>{t('메뉴바부터 나만의 편집기까지.<br>직접 넘겨보며 살펴보세요.', 'From the menu bar to your own little editors.<br>Take a closer look, one screen at a time.')}</p></div>
  <div class="app-gallery"><div class="gallery-toolbar"><div class="gallery-intro"><span class="tiny-dot"></span><strong>TypeCat for Mac</strong><span class="capture-tag">{t('앱 UI', 'APP UI')}</span></div><div class="screen-appearance" role="group" aria-label="{t('화면 미리보기 테마', 'Screenshot appearance')}"><button type="button" data-screen-theme="light" aria-pressed="true">{t('라이트', 'Light')}</button><button type="button" data-screen-theme="dark" aria-pressed="false">{t('다크', 'Dark')}</button></div></div>
  <div class="screen-choices" role="group" aria-label="{t('앱 화면 선택', 'Choose an app screen')}">{choices}</div>
  <a class="gallery-stage" data-screen-full href="{base}/assets/screens/sound-{locale}-light.webp" target="_blank" rel="noopener" aria-label="{t('현재 앱 화면 크게 보기, 새 탭', 'Open the current app screen in a new tab')}"><img data-screen-image src="{base}/assets/screens/sound-{locale}-light.webp" width="2072" height="1744" alt="TypeCat {t('소리 설정', 'sound preferences')}" loading="lazy"><span class="expand-hint">{t('크게 보기', 'Full image')} ↗</span></a>
  <div class="gallery-caption" aria-live="polite"><strong data-screen-title>{t('소리', 'Sounds')}</strong><p data-screen-caption>{t('분류와 검색으로 고르고, 선택을 바꾸지 않고 미리 들어요.', 'Browse, search, and audition a sound before selecting it.')}</p><span class="gallery-count" data-screen-count>02 / 09</span></div></div>
  <p class="capture-note">{t('현재 무료 버전의 실제 앱 컴포넌트를 한국어·영어, 라이트·다크로 렌더링한 화면입니다. 촬영용 기본 설정을 사용했으며 개인 파일은 포함하지 않았어요.', 'Rendered from the current free app’s actual components in Korean and English, light and dark. Screens use capture settings and contain no personal files.')}</p>
</section>
<section id="reactions" class="section reactions-section"><div class="section-heading"><div><p class="kicker">LITTLE MOVES / BIG PERSONALITY</p><h2>{t('가만히 있다가,<br>이렇게 반응해요.', 'Little moves.<br>Plenty of personality.')}</h2></div><p>{t('앱의 반응 체험 동작을 3초 GIF에 담았어요.<br>버튼을 눌러 네 친구를 움직여보세요.', 'Three-second GIFs from the app’s reaction preview.<br>Press play to meet each little personality.')}</p></div><div class="reaction-grid">{gifs}</div><p class="capture-note">{t('아쿠아 고양이는 클릭 스퀴시, 나머지 친구는 앱의 타이핑 반응 체험입니다. GIF는 버튼을 눌러야 재생되고 3초 뒤 멈춰요.', 'Aqua Cat shows a click squish; the other friends show the app’s typing-reaction preview. GIFs play on demand and return to still images after three seconds.')}</p></section>
<section id="first-run" class="section onboarding-section"><div class="section-heading"><div><p class="kicker">THE FIRST HELLO</p><h2>{t('처음 켰을 때도,<br>차근차근.', 'Your first hello,<br>one step at a time.')}</h2></div><p>{t('권한 안내부터 실제 입력 확인까지.<br>첫 실행 화면도 미리 볼 수 있어요.', 'From permission guidance to the physical-key test.<br>Here is what the first launch looks like.')}</p></div><div class="onboarding-shots">{setup_images}</div><p class="capture-note">{t('이 화면은 시작 안내의 UI 미리보기입니다. 입력 전달 성공을 뜻하지 않으며, 앱에서 실제 키를 다섯 번 눌러 확인해야 해요.', 'These are first-launch UI previews. They do not demonstrate input delivery; that requires five physical key presses in the app.')}</p></section>
'''
