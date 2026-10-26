from html import escape

VERSION = 'copy-20261026'


def build_media(en, base):
    def t(ko, eng):
        return eng if en else ko

    locale = 'en' if en else 'ko'
    screens = [
        ('menu', '메뉴바', 'Menu bar', '켜기·볼륨·친구 선택을 작은 패널 하나에서.', 'Quick access to sound, volume, and your companion.'),
        ('sound', '소리', 'Sounds', '소리와 키별 설정을 한곳에서.', 'Sound themes and per-key settings in one place.'),
        ('characters', '캐릭터', 'Companions', '네 친구와 타이핑 반응, 표시 크기를 한곳에서.', 'Four friends, reaction controls, and companion size in one place.'),
        ('timer', '타이머', 'Timer', '집중 시간과 쉬는 시간, 알림을 내 리듬에 맞춰요.', 'Set focus time, breaks, and alerts for your rhythm.'),
        ('preferences', '환경설정', 'Preferences', '테두리·색상·언어와 키보드 연결을 관리해요.', 'Manage appearance, language, and your keyboard connection.'),
        ('custom-character', '캐릭터 편집기', 'Image editor', '내 이미지로 나만의 친구를 만드는 곳.', 'Make a little companion from your own image.'),
        ('custom-sound', '음원 편집기', 'Sound editor', '음원을 가져오고 키별 소리를 구성해요.', 'Import audio and build your own key sounds.'),
        ('timer-config', '뽀모도로 설정', 'Pomodoro setup', '집중·휴식 시간과 알림을 설정해요.', 'Set focus time, breaks, and alerts.'),
        ('menu-timer', '집중 중 메뉴바', 'Focus controls', '남은 시간과 시작·정지를 메뉴바에서 간단하게.', 'Keep the remaining time and timer controls close.'),
    ]
    choices = ''.join(f'<button class="screen-choice" type="button" data-screen="{key}" data-title="{escape(t(ko,eng))}" data-caption="{escape(t(note,en_note))}" aria-pressed="{str(i == 1).lower()}">{t(ko,eng)}</button>' for i, (key, ko, eng, note, en_note) in enumerate(screens))
    setup = [('welcome', '처음 인사', 'Welcome'), ('permission', '권한 안내', 'Permission guide'), ('waiting', '연결 준비', 'Connection setup'), ('keyboard-test', '다섯 번 입력 테스트', 'Five-press test')]
    onboarding = ''.join(f'<figure><a href="{base}/assets/screens/{key}-{locale}-light.webp?v={VERSION}" target="_blank" rel="noopener" aria-label="{escape(t(ko,eng))} — {t("큰 화면으로 보기, 새 탭", "open full image in a new tab")}"><img src="{base}/assets/screens/{key}-{locale}-light.webp?v={VERSION}" width="1040" height="1120" loading="lazy" alt="TypeCat {escape(t(ko,eng))}"></a><figcaption>{t(ko,eng)}</figcaption></figure>' for key, ko, eng in setup)
    tour = f'''<section id="app" class="app-section" data-media-locale="{locale}">
  <div class="section-intro"><h2>{t('앱 안에서는<br>이렇게 만나요', 'A look inside<br>the real app')}</h2><p>{t('메뉴바부터 나만의 편집기까지.', 'From the menu bar to your own editors.')}</p></div>
  <div class="app-gallery">
    <div class="gallery-toolbar"><div class="screen-choices" role="group" aria-label="{t('앱 화면 선택', 'Choose an app screen')}">{choices}</div><div class="screen-appearance" role="group" aria-label="{t('화면 미리보기 테마', 'Screenshot appearance')}"><button type="button" data-screen-theme="light" aria-pressed="true">{t('라이트', 'Light')}</button><button type="button" data-screen-theme="dark" aria-pressed="false">{t('다크', 'Dark')}</button></div></div>
    <a class="gallery-stage" data-screen-full href="{base}/assets/screens/sound-{locale}-light.webp?v={VERSION}" target="_blank" rel="noopener" aria-label="{t('현재 앱 화면 크게 보기, 새 탭', 'Open the current app screen in a new tab')}"><img data-screen-image src="{base}/assets/screens/sound-{locale}-light.webp?v={VERSION}" width="2072" height="1744" alt="TypeCat {t('소리 설정', 'sound preferences')}" loading="lazy"><span class="expand-hint">{t('크게 보기', 'Full image')} ↗</span></a>
    <div class="gallery-caption" aria-live="polite"><span class="gallery-count" data-screen-count>02 / 09</span><strong data-screen-title>{t('소리', 'Sounds')}</strong><p data-screen-caption>{t('소리와 키별 설정을 한곳에서.', 'Sound themes and per-key settings in one place.')}</p></div>
  </div>
</section>'''
    return {'tour': tour, 'onboarding': onboarding}
