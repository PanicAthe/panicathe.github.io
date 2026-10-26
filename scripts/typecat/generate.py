from pathlib import Path
from html import escape
import json

ROOT = Path(__file__).resolve().parents[2]
DIST = ROOT / 'public/typecat'
ORIGIN = 'https://panicathe.github.io'
BASE = '/typecat'
config = json.loads((Path(__file__).resolve().parent / 'content.json').read_text())
EMAIL = config.get('public_support_email')

def contact(en=False):
    heading = 'Contact TypeCat' if en else 'TypeCat에 문의하기'
    if EMAIL:
        body = f'<a href="mailto:{escape(EMAIL)}?subject=TypeCat%20Support">{escape(EMAIL)}</a>'
        note = 'Please include your macOS version and a description of the issue. Do not send passwords, typed text, or personal media.' if en else 'macOS 버전과 문제 상황을 알려주세요. 비밀번호, 입력한 문장, 개인 이미지·음원은 보내지 않아도 됩니다.'
    else:
        body = '<p>Support contact is being prepared before release.</p>' if en else '<p>출시 전 문의 채널을 준비하고 있습니다.</p>'
        note = 'TypeCat has not been released on the Mac App Store yet.' if en else 'TypeCat은 아직 Mac App Store에 출시되지 않았습니다.'
    return f'<aside class="contact"><h2 style="margin-top:0">{heading}</h2>{body}<p>{note}</p></aside>'

def path(page, en=False):
    return BASE + ('/en/' if en else '/') + ('' if page == 'index' else page + '/')

def page(title, body, name, en=False, description=''):
    lang = 'en' if en else 'ko'
    nav_support = 'Support' if en else '사용 안내'
    nav_privacy = 'Privacy' if en else '개인정보처리방침'
    nav_features = 'Features' if en else '기능 소개'
    other = '한국어' if en else 'English'
    skip = 'Skip to content' if en else '본문으로 바로가기'
    out = DIST / ('en' if en else '') / ('' if name == 'index' else name)
    out.mkdir(parents=True, exist_ok=True)
    html = f'''<!doctype html>
<html lang="{lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{escape(title)} · TypeCat</title><meta name="description" content="{escape(description)}"><meta name="theme-color" content="#fafaf4"><meta property="og:title" content="{escape(title)} · TypeCat"><meta property="og:description" content="{escape(description)}"><meta property="og:type" content="website"><meta property="og:image" content="{ORIGIN}{BASE}/assets/icon.png"><link rel="canonical" href="{ORIGIN}{path(name,en)}"><link rel="alternate" hreflang="ko" href="{ORIGIN}{path(name)}"><link rel="alternate" hreflang="en" href="{ORIGIN}{path(name,True)}"><link rel="icon" type="image/png" href="{BASE}/assets/icon.png"><link rel="stylesheet" href="{BASE}/assets/style.css"></head>
<body><a class="skip" href="#main">{skip}</a><header><nav class="wrap" aria-label="{'Main navigation' if en else '주 메뉴'}"><a class="brand" href="{path('index',en)}"><img src="{BASE}/assets/icon.png" width="45" height="45" alt="">TypeCat</a><div class="navlinks"><a class="desktop" href="{path('index',en)}#features">{nav_features}</a><a href="{path('support',en)}">{nav_support}</a><a class="lang" href="{path(name,not en)}" lang="{'ko' if en else 'en'}">{other}</a></div></nav></header>
<main id="main" class="wrap">{body}</main><footer><div class="wrap foot"><span>© 2026 TypeCat. Made for your everyday typing.</span><div class="footlinks"><a href="{path('support',en)}">{nav_support}</a><a href="{path('privacy',en)}">{nav_privacy}</a></div></div></footer></body></html>'''
    (out / 'index.html').write_text(html)

for en in [False, True]:
    if en:
        title, intro = 'A little joy in every keystroke', 'Keyboard sounds, a little desktop companion, and a timer to keep you company. Make everyday typing a little more yours.'
        h1 = 'A little joy.<br>Every keystroke.'
        items = [('01 / SOUND', 'Find your sound.', 'Explore 12 bundled sound themes, from mechanical keys and typewriter clicks to gentle instruments. Preview, save favorites, or import your own audio.'), ('02 / COMPANION', 'A small friend, nearby.', 'Choose Aqua Cat, Cat, Dog, or Rabbit. Your companion responds to typing, can look in different directions, and can be moved and resized. You can also use your own image.'), ('03 / FOCUS', 'Make room for focus.', 'Use the countdown or Pomodoro timer from your menu bar. Your companion displays the remaining time. Pause, reset, and choose a separate alert sound and volume.')]
        kicker, feature_title, feature_note = 'SMALL THINGS, GOOD COMPANY', 'A softer rhythm<br>for your everyday.', 'Lives in your menu bar. A few thoughtful touches, ready when you are.'
        cta1, cta2, status = 'Explore TypeCat', 'Getting started', 'Mac App Store release in preparation · macOS 13 or later'
        strip = ['12 sound themes', '4 companions', 'Processed on your Mac']
        sound_title, sound_note = 'From crisp clicks to softer notes.', 'Mechanical, typewriter, bubble, arcade, tropical, music box, lo-fi piano, soft thock, brown switch, blue switch, office, and tiny buttons.'
        pill = ['Keyboard', 'Effects', 'Instruments', 'Your own sounds']
        privacy_title, privacy_note, privacy_link = 'Your words stay yours.', 'TypeCat processes key categories and timing locally to create sounds and reactions. It does not extract, store, or transmit the characters or sentences you type.', 'Read our privacy policy ↗'
        faq_title, faq_note, faq_link = 'A little help getting started?', 'Find setup instructions, keyboard permission help, and answers about your files.', 'Visit TypeCat support →'
    else:
        title, intro = '키보드 위의 작은 기분 전환', '기분 좋은 타건음, 곁에서 반응하는 작은 친구, 집중을 도와주는 타이머. 매일의 타이핑에 나만의 리듬을 더해보세요.'
        h1 = '키보드 위의<br>작은 기분 전환.'
        items = [('01 / SOUND', '오늘의 소리를 골라요.', '또각또각 기계식부터 부드러운 악기 소리까지. 12가지 기본 테마를 미리 듣고 즐겨찾기에 담아보세요. 내 음원을 직접 가져올 수도 있어요.'), ('02 / COMPANION', '작은 친구와 함께해요.', '아쿠아 고양이, 고양이, 강아지, 토끼가 타이핑에 반응해요. 시선과 위치, 크기를 취향대로 조절하고, 내 이미지로 친구를 만들 수도 있어요.'), ('03 / FOCUS', '집중할 시간도 챙겨요.', '메뉴바에서 타이머와 뽀모도로를 시작해보세요. 친구 아래에 남은 시간이 표시돼요. 완료 알림음과 볼륨은 따로 고를 수 있어요.')]
        kicker, feature_title, feature_note = 'SMALL THINGS, GOOD COMPANY', '익숙한 하루에,<br>기분 좋은 리듬.', '메뉴바에 가볍게 머물며, 타이핑하는 순간에 작은 재미를 더해요.'
        cta1, cta2, status = '어떤 앱인가요?', '처음 사용하기', 'Mac App Store 출시 준비 중 · macOS 13 이상'
        strip = ['12가지 기본 소리', '4종의 작은 친구', 'Mac 안에서 처리']
        sound_title, sound_note = '또각또각부터 말랑한 소리까지.', '기계식, 타자기, 버블, 아케이드, 트로피컬, 뮤직박스, 로파이 피아노, 도각도각, 윤활 갈축, 청축, 사무용 키보드, 작은 버튼.'
        pill = ['키보드', '효과음', '악기', '직접 가져온 소리']
        privacy_title, privacy_note, privacy_link = '입력한 문장은, 당신의 것.', 'TypeCat은 키의 종류와 이벤트 간 시간을 Mac 안에서 일시적으로 처리해요. 입력한 문자나 문장을 추출하거나 저장·전송하지 않아요.', '개인정보처리방침 읽기 ↗'
        faq_title, faq_note, faq_link = '처음 만나는 TypeCat, 어렵지 않게.', '시작 방법부터 키보드 권한, 직접 가져온 파일까지 안내해드려요.', '사용 안내와 고객지원 →'
    feature_html = ''.join(f'<article class="feature"><span class="num">{n}</span><h3>{h}</h3><p>{p}</p></article>' for n,h,p in items)
    hero = f'''<section class="hero"><div><p class="eyebrow">A LITTLE COMPANION FOR YOUR MAC</p><h1>{h1}</h1><p class="lead">{intro}</p><div class="actions"><a class="button" href="#features">{cta1} ↘</a><a class="button secondary" href="{path('support',en)}">{cta2}</a></div><p class="release">{status}</p></div><div class="art"><img src="{BASE}/assets/aqua.png" width="1312" height="1199" alt="{'Aqua Cat, TypeCat’s blue-eyed desktop companion' if en else '파란 눈의 작은 데스크톱 친구, 아쿠아 고양이'}" fetchpriority="high"><span class="key" aria-hidden="true">↵</span><span class="tag"><b>●</b>{'Your little typing companion.' if en else '타닥타닥, 곁에 있어요.'}</span></div></section>
<div class="strip">{''.join(f'<span><i>✓</i>{s}</span>' for s in strip)}</div><section id="features" class="section"><div class="sectionhead"><div><p class="eyebrow">{kicker}</p><h2>{feature_title}</h2></div><p>{feature_note}</p></div><div class="features">{feature_html}</div><div class="sounds"><div><h3>{sound_title}</h3><p>{sound_note}</p></div><div class="pills">{''.join(f'<span class="pill">{p}</span>' for p in pill)}</div></div></section><section class="privacycall"><div><h2>{privacy_title}</h2><p>{privacy_note}</p></div><a href="{path('privacy',en)}">{privacy_link}</a></section><section class="faqhome"><h2>{faq_title}</h2><p>{faq_note}</p><a href="{path('support',en)}">{faq_link}</a></section>'''
    page(title,hero,'index',en,intro)

    if en:
        policy = '''<p class="eyebrow">PRIVACY, SIMPLY</p><h1>Privacy policy</h1><p class="intro">Your typing stays on your Mac.</p><p class="updated">Effective and last updated: October 26, 2026</p>
<div class="notice"><p>TypeCat does not collect typed text. The app does not have accounts, advertisements, analytics SDKs, or tracking.</p></div>
<h2>1. Keyboard events</h2><p>With your Input Monitoring permission, TypeCat uses a passive, listen-only global event tap to temporarily process key categories and time between events for sounds and character animation. It does not extract, log, store, or transmit the characters or sentences you type. The keyboard connection test counts five physical key presses received by this same global event tap; it does not collect text.</p>
<h2>2. Settings and imported files</h2><p>Settings and copies of images and audio you choose to import are stored locally on your Mac. Original files are not modified. Images are re-encoded as PNG; imported sound copies and trimmed playback clips are kept in the local library. They are not uploaded to a TypeCat server.</p>
<h2>3. Collection, sharing, and tracking</h2><p>The app has no user account, advertising, analytics, or tracking features. It does not send app usage or personal data to a TypeCat server and does not sell or share your data with advertisers. App Store downloads, payments, and Apple-provided services are governed by Apple’s own policies.</p>
<h2>4. Website and support</h2><p>This website does not add advertising, analytics scripts, contact forms, or tracking cookies. Website hosting providers may process technical request information, such as IP addresses and browser information, to deliver and secure the website. This site is hosted on GitHub Pages. GitHub logs and stores visitor IP addresses for security purposes. See <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub’s privacy statement</a> and <a href="https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection">GitHub Pages data collection</a> for details.</p><p>If you contact support by email, your email provider and our support mailbox process your address and the message you send. We use those messages to respond to your inquiry. Please do not include passwords, typed text, or personal media. You can request deletion of support correspondence by contacting us.</p>
<h2>5. Retention, deletion, and permissions</h2><p>You can remove or replace imported items from the character and sound editors. Local settings and files may remain after uninstalling the app. Back up anything you need and follow the complete removal steps on the support page. Revoke Input Monitoring at any time in System Settings → Privacy &amp; Security → Input Monitoring.</p>
<h2>6. Changes and contact</h2><p>TypeCat maintains this policy and updates its effective date when its data practices change. Questions about privacy or your local data can be sent using the contact information below.</p>'''
        support = '''<p class="eyebrow">HERE TO HELP</p><h1>A little help,<br>when you need it.</h1><p class="intro">Setup, sounds, and your small desktop friend.</p><div class="notice"><p>TypeCat’s Mac App Store release is in preparation. The public release includes four companions and 12 sound themes. There are no purchases or subscriptions in this release.</p></div><div class="support-top"><h2>Start with three steps.</h2><ol><li>Open TypeCat from Applications. Click its menu bar icon to open the controls.</li><li>Allow Input Monitoring in System Settings → Privacy &amp; Security → Input Monitoring.</li><li>Open Preferences → Test keyboard connection and press five physical keys. The counter must reach 5/5 to confirm actual global input delivery.</li></ol></div>
<details open><summary>Sounds or character reactions are not working.</summary><p>Confirm TypeCat is enabled, the app is not muted, and a sound is selected. A permission toggle alone does not prove event delivery: use Preferences → Test keyboard connection and physically press five keys. The test does not read or display typed text. Secure input, such as password fields, may restrict reactions. If macOS requests authentication or relaunch, complete those steps yourself.</p></details>
<details><summary>Can I import my own image or sound?</summary><p>Yes. Use the character or sound editor in Preferences. The free release keeps one custom character and one custom sound set; a sound set can contain up to 32 imported sources with five key-category assignments. Replacing or deleting an imported copy does not change the original file.</p></details>
<details><summary>How does the timer work?</summary><p>Start a countdown or Pomodoro from the menu bar or Timer preferences. The remaining time appears below your companion. Reset the timer before changing an active mode or duration. Turning TypeCat off pauses it; resume it when ready. After relaunch, the saved remaining time can be resumed. Time does not count down while the app is closed.</p></details>
<details><summary>How can I compare sounds or change volume?</summary><p>Use the preview button to listen without changing your current sound. Save favorites and browse keyboard, effects, or instrument categories. The menu bar and Sound preferences provide app volume and mute controls. Timer alerts have a separate volume.</p></details>
<details><summary>How do I remove my files and reset TypeCat?</summary><p>Back up any images or sounds you want to keep, then quit TypeCat. For the Mac App Store edition, open Finder → Go → Go to Folder and inspect <code>~/Library/Containers/app.squishkey.mac/</code>. Confirm it belongs to TypeCat before moving it to Trash. This removes the app’s local settings and imported copies. Uninstalling the app alone may leave this data behind. Older development editions may separately keep data in <code>~/Library/Application Support/app.squishkey.mac/</code> and their preference domain. Do not delete other apps’ folders.</p></details>
<details><summary>Does TypeCat record what I type?</summary><p>No. Key categories and event timing are processed locally and temporarily for sound and animation. Typed characters and sentences are not extracted, logged, saved, or transmitted. Read the privacy policy for details.</p></details>'''
    else:
        policy = '''<p class="eyebrow">PRIVACY, SIMPLY</p><h1>개인정보처리방침</h1><p class="intro">타이핑은 Mac 안에, 그대로.</p><p class="updated">시행일 및 최종 수정일: 2026년 10월 26일</p>
<div class="notice"><p>TypeCat은 입력한 문장을 수집하지 않습니다. 앱에는 계정, 광고, 분석 SDK, 추적 기능이 없습니다.</p></div>
<h2>1. 키보드 이벤트 처리</h2><p>TypeCat은 사용자가 허용한 입력 모니터링 권한으로 수동·수신 전용 글로벌 이벤트 탭을 사용합니다. 키 종류와 이벤트 간 시간을 일시적으로 처리하여 타건음과 캐릭터 반응을 제공합니다. 입력한 문자나 문장을 추출하거나 기록·저장·전송하지 않습니다. 키보드 연결 테스트도 동일한 글로벌 이벤트 탭이 전달받은 실제 키 누름 5회만 세며 입력 내용은 수집하지 않습니다.</p>
<h2>2. 설정과 직접 가져온 파일</h2><p>앱 설정과 사용자가 선택하여 가져온 이미지·음원 사본은 Mac의 로컬 저장소에 보관됩니다. 원본 파일은 수정하지 않습니다. 이미지는 PNG로 다시 인코딩하며, 음원은 가져온 사본과 잘라낸 재생 파일로 보관합니다. 이 파일들은 TypeCat 서버로 업로드되지 않습니다.</p>
<h2>3. 수집·공유·추적</h2><p>앱은 사용자 계정, 광고, 분석, 추적 기능을 사용하지 않습니다. 앱 이용 정보나 개인정보를 TypeCat 서버로 보내지 않으며 광고업체에 판매하거나 공유하지 않습니다. App Store 다운로드, 결제 및 Apple이 제공하는 서비스에는 Apple의 정책이 적용됩니다.</p>
<h2>4. 홈페이지와 고객지원</h2><p>이 홈페이지에는 광고, 분석 스크립트, 문의 입력 폼, 추적 쿠키를 추가하지 않았습니다. 홈페이지를 제공하고 보호하는 과정에서 호스팅 제공업체가 IP 주소·브라우저 정보 등 기술적인 요청 정보를 처리할 수 있습니다. 홈페이지는 GitHub Pages에서 제공합니다. GitHub는 보안 목적으로 방문자의 IP 주소를 기록·보관합니다. 자세한 내용은 <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub 개인정보처리방침</a>과 <a href="https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection">GitHub Pages 데이터 수집 안내</a>를 참고하세요.</p><p>이메일로 문의하면 이메일 제공업체와 고객지원 메일함이 발신 주소와 사용자가 보낸 메시지를 처리합니다. 문의 내용은 답변 목적으로 사용합니다. 비밀번호, 입력한 문장, 개인 이미지·음원은 보내지 마세요. 문의 기록 삭제를 원하면 아래의 문의처로 요청할 수 있습니다.</p>
<h2>5. 보관·삭제와 권한 철회</h2><p>가져온 파일은 캐릭터·사운드 편집 화면에서 삭제하거나 교체할 수 있습니다. 앱 삭제만으로 모든 로컬 설정과 파일이 지워지지는 않을 수 있습니다. 필요한 파일을 백업한 뒤 고객지원 페이지의 전체 삭제 절차를 참고하세요. 입력 모니터링 권한은 시스템 설정 → 개인정보 보호 및 보안 → 입력 모니터링에서 언제든 철회할 수 있습니다.</p>
<h2>6. 변경 안내와 문의</h2><p>이 방침은 TypeCat에서 관리합니다. 데이터 처리 방식이 변경되면 이 페이지와 시행일을 업데이트합니다. 개인정보나 로컬 데이터 관련 문의는 아래의 문의처로 보내주세요.</p>'''
        support = '''<p class="eyebrow">HERE TO HELP</p><h1>작은 궁금증도,<br>차근차근 함께.</h1><p class="intro">TypeCat 시작부터 소리와 친구 설정까지 안내합니다.</p><div class="notice"><p>TypeCat은 Mac App Store 출시를 준비하고 있습니다. 공개 버전은 기본 캐릭터 4종과 소리 12종을 제공하며, 앱 내 구입이나 구독은 없습니다.</p></div><div class="support-top"><h2>처음 시작하는 세 단계.</h2><ol><li>응용 프로그램에서 TypeCat을 실행한 뒤 메뉴바 아이콘을 누릅니다.</li><li>시스템 설정 → 개인정보 보호 및 보안 → 입력 모니터링에서 TypeCat을 허용합니다.</li><li>환경설정 → 키보드 연결 테스트를 열고 실제 키를 다섯 번 누릅니다. 5/5가 표시되어야 글로벌 입력 전달이 확인된 것입니다.</li></ol></div>
<details open><summary>소리나 캐릭터가 반응하지 않아요.</summary><p>TypeCat의 상단 스위치가 켜져 있는지, 무음 상태는 아닌지, 소리가 선택되어 있는지 확인하세요. 시스템의 권한 스위치만으로는 실제 입력 전달을 확인할 수 없습니다. 환경설정 → 키보드 연결 테스트에서 실제 키를 다섯 번 눌러 확인하세요. 테스트는 입력한 글자를 읽거나 표시하지 않습니다. 비밀번호 입력 등 보안 입력이 켜진 상황에서는 반응이 제한될 수 있습니다. macOS가 인증이나 재실행을 요구하면 직접 진행해주세요.</p></details>
<details><summary>내 이미지나 음원도 사용할 수 있나요?</summary><p>네. 환경설정의 캐릭터·사운드 편집 화면에서 가져올 수 있습니다. 무료 버전에는 직접 만든 캐릭터 1개와 커스텀 사운드 세트 1개를 저장할 수 있습니다. 사운드 세트에는 최대 32개 원본을 가져와 다섯 키 분류에 배정할 수 있습니다. 가져온 사본의 교체나 삭제는 원본 파일을 변경하지 않습니다.</p></details>
<details><summary>타이머는 어떻게 사용하나요?</summary><p>메뉴바 또는 환경설정 → 타이머에서 카운트다운이나 뽀모도로를 시작하세요. 캐릭터 아래에 남은 시간이 표시됩니다. 실행 중인 모드나 시간을 변경하려면 먼저 초기화하세요. TypeCat을 끄면 타이머가 일시정지되며 다시 켠 뒤 이어서 시작할 수 있습니다. 앱을 닫았다 열어도 저장된 남은 시간부터 이어서 시작할 수 있습니다. 앱이 닫힌 동안에는 카운트다운하지 않습니다.</p></details>
<details><summary>소리를 비교하거나 볼륨을 바꾸고 싶어요.</summary><p>목록의 미리듣기 버튼으로 현재 선택을 바꾸지 않고 다른 소리를 들어보세요. 키보드·효과음·악기별로 탐색하고 자주 쓰는 소리는 즐겨찾기에 담을 수 있습니다. 메뉴바와 사운드 설정에서 앱 볼륨과 무음을 조절합니다. 타이머 완료 알림은 별도 볼륨을 사용합니다.</p></details>
<details><summary>설정과 가져온 파일을 모두 지우려면요?</summary><p>필요한 이미지·음원을 먼저 백업한 뒤 TypeCat을 종료하세요. Mac App Store 버전은 Finder → 이동 → 폴더로 이동에서 <code>~/Library/Containers/app.squishkey.mac/</code>을 확인합니다. TypeCat 데이터가 맞는지 확인한 뒤 휴지통으로 보내면 앱 설정과 가져온 사본이 삭제됩니다. 앱만 제거하면 이 데이터가 남을 수 있습니다. 이전 개발 버전은 <code>~/Library/Application Support/app.squishkey.mac/</code>와 해당 환경설정 도메인에 별도 데이터가 남을 수 있습니다. 다른 앱의 폴더는 삭제하지 마세요.</p></details>
<details><summary>제가 입력한 문장을 기록하나요?</summary><p>아니요. 키 종류와 이벤트 간 시간은 소리와 애니메이션을 위해 Mac 안에서만 일시적으로 처리됩니다. 입력한 문자나 문장은 추출·기록·저장·전송하지 않습니다. 자세한 내용은 개인정보처리방침을 확인하세요.</p></details>'''
    page('Privacy policy' if en else '개인정보처리방침','<article class="document">'+policy+contact(en)+'</article>','privacy',en,'How TypeCat handles keyboard events, local files, and privacy.' if en else '키보드 이벤트와 로컬 파일, 홈페이지와 고객지원의 개인정보 처리 안내입니다.')
    page('Support' if en else '사용 안내와 고객지원','<article class="document">'+support+contact(en)+'</article>','support',en,'Get started with TypeCat and find help with permissions, sounds, timers, and files.' if en else 'TypeCat 시작 방법과 키보드 권한, 소리, 타이머, 파일 관리에 관한 도움말입니다.')

(DIST/'robots.txt').write_text('User-agent: *\nAllow: /\nSitemap: '+ORIGIN+BASE+'/sitemap.xml\n')
urls = [ORIGIN+path(n,en) for en in [False,True] for n in ['index','privacy','support']]
(DIST/'sitemap.xml').write_text('<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+''.join('<url><loc>'+u+'</loc></url>' for u in urls)+'</urlset>')
print('Generated six bilingual TypeCat pages for GitHub Pages.')
