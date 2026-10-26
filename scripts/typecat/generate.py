from pathlib import Path
from html import escape, unescape
import json
import re
from home import build_home
from media import build_media

ROOT = Path(__file__).resolve().parents[2]
DIST = ROOT / 'public/typecat'
ORIGIN = 'https://panicathe.github.io'
BASE = '/typecat'
ASSET_VERSION = 'bands-cache-20261027'
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

def document_layout(body, name, en):
    if name == 'support':
        anchors = iter(['keyboard-help', 'custom-files', 'timer-help', 'sounds-help', 'data-help', 'privacy-help'])
        body = re.sub(r'<details( open)?>', lambda m: f'<details id="{next(anchors)}" name="help-faq"{m.group(1) or ""}>', body)
        topics = [('keyboard-help', 'Keyboard' if en else '키보드 연결'), ('custom-files', 'Your files' if en else '이미지·음원'), ('timer-help', 'Timer' if en else '타이머'), ('data-help', 'Reset & data' if en else '파일 관리')]
        quick = '<nav class="help-topics" aria-label="' + ('Help topics' if en else '도움말 주제') + '">' + ''.join(f'<a href="#{anchor}">{label}</a>' for anchor, label in topics) + '</nav>'
        body = re.sub(r'(<p class="intro">.*?</p>)', lambda m: m.group(1) + quick, body, count=1)
    entries = []
    def heading(match):
        index = len(entries) + 1
        anchor = f'document-section-{index}'
        label = unescape(re.sub('<[^>]+>', '', match.group(2)))
        entries.append((anchor, label))
        return f'<h2{match.group(1)} id="{anchor}">{match.group(2)}</h2>'
    body = re.sub(r'<h2([^>]*)>(.*?)</h2>', heading, body)
    links = ''.join(f'<a href="#{anchor}">{escape(label)}</a>' for anchor, label in entries)
    mobile = '<details class="mobile-contents"><summary>' + ('On this page' if en else '이 페이지에서 빠르게 찾기') + '</summary><nav>' + links + '</nav></details>'
    body = body.replace('<h2', mobile + '<h2', 1)
    label = ('Support' if en else '사용 안내') if name == 'support' else ('Privacy' if en else '개인정보처리방침')
    crumb = f'<div class="breadcrumb"><a href="{path("index", en)}">TypeCat</a><span>/</span><span>{label}</span></div>'
    body = body.replace('<article class="document">', '<article class="document">' + crumb, 1)
    aside = '<aside class="document-index"><p>' + ('On this page' if en else '이 페이지에서') + '</p><nav aria-label="' + ('Page contents' if en else '페이지 목차') + '">' + links + '</nav><a class="index-help" href="' + path('support', en) + '">' + ('Need a little help?' if en else '도움이 필요하신가요?') + '</a></aside>'
    return '<div class="document-layout">' + body + aside + '</div>'


def page(title, body, name, en=False, description=''):
    lang = 'en' if en else 'ko'
    nav_support = 'Support' if en else '사용 안내'
    nav_privacy = 'Privacy' if en else '개인정보처리방침'
    nav_features = 'Features' if en else '기능 소개'
    other = '한국어' if en else 'English'
    skip = 'Skip to content' if en else '본문으로 바로가기'
    if name != 'index':
        body = document_layout(body, name, en)
    out = DIST / ('en' if en else '') / ('' if name == 'index' else name)
    out.mkdir(parents=True, exist_ok=True)
    html = f'''<!doctype html>
<html lang="{lang}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>{escape(title)} · TypeCat</title><meta name="description" content="{escape(description)}"><meta name="theme-color" content="#5161f5"><meta property="og:title" content="{escape(title)} · TypeCat"><meta property="og:description" content="{escape(description)}"><meta property="og:type" content="website"><meta property="og:image" content="{ORIGIN}{BASE}/assets/icon.png"><link rel="canonical" href="{ORIGIN}{path(name,en)}"><link rel="alternate" hreflang="ko" href="{ORIGIN}{path(name)}"><link rel="alternate" hreflang="en" href="{ORIGIN}{path(name,True)}"><link rel="icon" type="image/png" href="{BASE}/assets/icon.png"><link rel="preload" href="{BASE}/assets/fonts/typecat-display.woff" as="font" type="font/woff" crossorigin><link rel="stylesheet" href="{BASE}/assets/style.css?v={ASSET_VERSION}"></head>
<body data-page="{name}"><a class="skip" href="#main">{skip}</a><header class="site-header"><nav class="site-nav" aria-label="{'Main navigation' if en else '주 메뉴'}"><a class="brand" href="{path('index',en)}"><img src="{BASE}/assets/icon.png" width="36" height="36" alt="">TypeCat</a><div class="navlinks"><a href="{path('index',en)}#companions">{'Friends' if en else '친구들'}</a><a class="desktop-nav" href="{path('index',en)}#sound">{'Sounds' if en else '소리'}</a><a class="desktop-nav" href="{path('index',en)}#app">{'App tour' if en else '앱 둘러보기'}</a><a class="desktop-nav" href="{path('index',en)}#focus">{'Timer' if en else '타이머'}</a><a href="{path('support',en)}" {'aria-current="page"' if name == 'support' else ''}>{nav_support}</a><a class="lang" href="{path(name,not en)}" lang="{'ko' if en else 'en'}">{'한국어' if en else 'EN'}</a></div></nav></header>
<main id="main" class="wrap">{body}</main><footer class="site-footer"><div class="footer-top"><div class="footer-links"><a href="{path('index',en)}#companions">{'Meet the friends' if en else '친구들 만나기'}</a><a href="{path('support',en)}">{nav_support}</a><a href="{path('privacy',en)}">{nav_privacy}</a><a href="/">{'Portfolio' if en else '포트폴리오'}</a></div><p>{'Your desk, a little more alive.' if en else '매일의 책상에, 작은 기분 전환.'}</p></div><a class="footer-wordmark" href="{path('index',en)}" aria-label="TypeCat">TypeCat</a><div class="footer-bottom"><span>© 2026 TypeCat</span><span>{'macOS 13 or later. Mac App Store release in preparation.' if en else 'macOS 13 이상. Mac App Store 출시 준비 중.'}</span><a href="mailto:{EMAIL}">{EMAIL}</a></div></footer><script src="{BASE}/assets/site.js?v={ASSET_VERSION}" defer></script></body></html>'''
    (out / 'index.html').write_text(html)

for en in [False, True]:
    lang = 'en' if en else 'ko'
    title = 'A little joy in every keystroke' if en else '타이핑에 더하는 작은 즐거움'
    intro = 'Feel-good sounds, four little companions, and a timer for your Mac.' if en else '기분 좋은 타건음, 네 명의 작은 친구, 메뉴바 타이머. Mac을 위한 TypeCat.'
    companion_data = [
        ('aqua-cat', 'Aqua Cat' if en else '아쿠아 고양이', 'Soft, opal, and a little squishy.' if en else '몽글몽글, 오팔빛 작은 친구.'),
        ('cat', 'Cat' if en else '고양이', 'A tuxedo kitten with tiny typing paws.' if en else '작은 앞발로 타닥타닥, 턱시도 키튼.'),
        ('dog', 'Dog' if en else '강아지', 'A golden corgi to brighten your desk.' if en else '책상에 따뜻함을 더하는 골든 코기.'),
        ('hamster', 'Hamster' if en else '햄스터', 'Little paws. One lavender wheel.' if en else '라벤더 쳇바퀴 위의 조그만 러너.'),
    ]
    home = build_home(en, BASE, path, companion_data, build_media(en, BASE))
    page(title, home, 'index', en, intro)

    if en:
        policy = '''<h1>Privacy policy</h1><p class="intro">Your typing stays on your Mac.</p><p class="updated">Effective and last updated: October 27, 2026</p>
<div class="notice"><p>TypeCat does not collect typed text. The app does not have accounts, advertisements, analytics SDKs, or tracking.</p></div>
<h2>1. Keyboard events</h2><p>With your Input Monitoring permission, TypeCat uses a passive, listen-only global event tap to temporarily process key categories and time between events for sounds and character animation. It does not extract, log, store, or transmit the characters or sentences you type. The keyboard connection test counts five physical key presses received by this same global event tap; it does not collect text.</p>
<h2>2. Settings and imported files</h2><p>Settings and copies of images and audio you choose to import are stored locally on your Mac. Original files are not modified. Images are re-encoded as PNG; imported sound copies and trimmed playback clips are kept in the local library. They are not uploaded to a TypeCat server.</p>
<h2>3. Collection, sharing, and tracking</h2><p>The app has no user account, advertising, analytics, or tracking features. It does not send app usage or personal data to a TypeCat server and does not sell or share your data with advertisers. App Store downloads, payments, and Apple-provided services are governed by Apple’s own policies.</p>
<h2>4. Website and support</h2><p>This website does not add advertising, analytics scripts, contact forms, or tracking cookies. Website hosting providers may process technical request information, such as IP addresses and browser information, to deliver and secure the website. This site is hosted on GitHub Pages. GitHub logs and stores visitor IP addresses for security purposes. See <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub’s privacy statement</a> and <a href="https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection">GitHub Pages data collection</a> for details.</p><p>If you contact support by email, your email provider and our support mailbox process your address and the message you send. We use those messages to respond to your inquiry and delete the support correspondence within 30 days after the inquiry is closed. Please do not include passwords, typed text, or personal media. You can request deletion of support correspondence by contacting us.</p>
<h2>5. Retention, deletion, and permissions</h2><p>You can remove or replace imported items from the character and sound editors. Local settings and files may remain after uninstalling the app. Back up anything you need and follow the complete removal steps on the support page. Revoke Input Monitoring at any time in System Settings → Privacy &amp; Security → Input Monitoring.</p>
<h2>6. Changes and contact</h2><p>TypeCat is operated by Eunjin Choi. The operator maintains this policy and updates its effective date when its data practices change. Questions about privacy or your local data can be sent using the contact information below.</p>'''
        support = '''<h1>A little help,<br>when you need it.</h1><p class="intro">Setup, sounds, and your small desktop friend.</p><div class="notice"><p>TypeCat’s Mac App Store release is in preparation. The public release includes four companions and 12 sound themes. There are no purchases or subscriptions in this release.</p></div><div class="support-top"><h2>Start with three steps.</h2><ol><li>Open TypeCat from Applications. Click its menu bar icon to open the controls.</li><li>Allow Input Monitoring in System Settings → Privacy &amp; Security → Input Monitoring.</li><li>Open Preferences → Test keyboard connection and press five physical keys. The counter must reach 5/5 to confirm actual global input delivery.</li></ol></div>
<details open><summary>Sounds or character reactions are not working.</summary><p>Confirm TypeCat is enabled, the app is not muted, and a sound is selected. A permission toggle alone does not prove event delivery: use Preferences → Test keyboard connection and physically press five keys. The test does not read or display typed text. Secure input, such as password fields, may restrict reactions. If macOS requests authentication or relaunch, complete those steps yourself.</p></details>
<details><summary>Can I import my own image or sound?</summary><p>Yes. Use the character or sound editor in Preferences. The free release keeps one custom character and one custom sound set; a sound set can contain up to 32 imported sources with five key-category assignments. Replacing or deleting an imported copy does not change the original file.</p></details>
<details><summary>How does the timer work?</summary><p>Start a countdown or Pomodoro from the menu bar or Timer preferences. The remaining time appears below your companion. Reset the timer before changing an active mode or duration. Turning TypeCat off pauses it; resume it when ready. After relaunch, the saved remaining time can be resumed. Time does not count down while the app is closed.</p></details>
<details><summary>How can I compare sounds or change volume?</summary><p>Use the preview button to listen without changing your current sound. Save favorites and browse keyboard, effects, or instrument categories. The menu bar and Sound preferences provide app volume and mute controls. Timer alerts have a separate volume.</p></details>
<details><summary>How do I remove my files and reset TypeCat?</summary><p>Back up any images or sounds you want to keep, then quit TypeCat. For the Mac App Store edition, open Finder → Go → Go to Folder and inspect <code>~/Library/Containers/app.squishkey.mac/</code>. Confirm it belongs to TypeCat before moving it to Trash. This removes the app’s local settings and imported copies. Uninstalling the app alone may leave this data behind. Older development editions may separately keep data in <code>~/Library/Application Support/app.squishkey.mac/</code> and their preference domain. Do not delete other apps’ folders.</p></details>
<details><summary>Does TypeCat record what I type?</summary><p>No. Key categories and event timing are processed locally and temporarily for sound and animation. Typed characters and sentences are not extracted, logged, saved, or transmitted. Read the privacy policy for details.</p></details>'''
    else:
        policy = '''<h1>개인정보처리방침</h1><p class="intro">타이핑은 Mac 안에, 그대로.</p><p class="updated">시행일 및 최종 수정일: 2026년 10월 27일</p>
<div class="notice"><p>TypeCat은 입력한 문장을 수집하지 않습니다. 앱에는 계정, 광고, 분석 SDK, 추적 기능이 없습니다.</p></div>
<h2>1. 키보드 이벤트 처리</h2><p>TypeCat은 사용자가 허용한 입력 모니터링 권한으로 수동·수신 전용 글로벌 이벤트 탭을 사용합니다. 키 종류와 이벤트 간 시간을 일시적으로 처리하여 타건음과 캐릭터 반응을 제공합니다. 입력한 문자나 문장을 추출하거나 기록·저장·전송하지 않습니다. 키보드 연결 테스트도 동일한 글로벌 이벤트 탭이 전달받은 실제 키 누름 5회만 세며 입력 내용은 수집하지 않습니다.</p>
<h2>2. 설정과 직접 가져온 파일</h2><p>앱 설정과 사용자가 선택하여 가져온 이미지·음원 사본은 Mac의 로컬 저장소에 보관됩니다. 원본 파일은 수정하지 않습니다. 이미지는 PNG로 다시 인코딩하며, 음원은 가져온 사본과 잘라낸 재생 파일로 보관합니다. 이 파일들은 TypeCat 서버로 업로드되지 않습니다.</p>
<h2>3. 수집·공유·추적</h2><p>앱은 사용자 계정, 광고, 분석, 추적 기능을 사용하지 않습니다. 앱 이용 정보나 개인정보를 TypeCat 서버로 보내지 않으며 광고업체에 판매하거나 공유하지 않습니다. App Store 다운로드, 결제 및 Apple이 제공하는 서비스에는 Apple의 정책이 적용됩니다.</p>
<h2>4. 홈페이지와 고객지원</h2><p>이 홈페이지에는 광고, 분석 스크립트, 문의 입력 폼, 추적 쿠키를 추가하지 않았습니다. 홈페이지를 제공하고 보호하는 과정에서 호스팅 제공업체가 IP 주소·브라우저 정보 등 기술적인 요청 정보를 처리할 수 있습니다. 홈페이지는 GitHub Pages에서 제공합니다. GitHub는 보안 목적으로 방문자의 IP 주소를 기록·보관합니다. 자세한 내용은 <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">GitHub 개인정보처리방침</a>과 <a href="https://docs.github.com/en/pages/getting-started-with-github-pages/what-is-github-pages#data-collection">GitHub Pages 데이터 수집 안내</a>를 참고하세요.</p><p>이메일로 문의하면 이메일 제공업체와 고객지원 메일함이 발신 주소와 사용자가 보낸 메시지를 처리합니다. 문의 내용은 답변 목적으로 사용하며, 문의가 종료된 날로부터 30일 이내에 고객지원 이메일 기록을 삭제합니다. 비밀번호, 입력한 문장, 개인 이미지·음원은 보내지 마세요. 문의 기록 삭제를 원하면 아래의 문의처로 요청할 수 있습니다.</p>
<h2>5. 보관·삭제와 권한 철회</h2><p>가져온 파일은 캐릭터·사운드 편집 화면에서 삭제하거나 교체할 수 있습니다. 앱 삭제만으로 모든 로컬 설정과 파일이 지워지지는 않을 수 있습니다. 필요한 파일을 백업한 뒤 고객지원 페이지의 전체 삭제 절차를 참고하세요. 입력 모니터링 권한은 시스템 설정 → 개인정보 보호 및 보안 → 입력 모니터링에서 언제든 철회할 수 있습니다.</p>
<h2>6. 변경 안내와 문의</h2><p>TypeCat의 운영자는 Eunjin Choi이며, 이 방침을 관리합니다. 데이터 처리 방식이 변경되면 이 페이지와 시행일을 업데이트합니다. 개인정보나 로컬 데이터 관련 문의는 아래의 문의처로 보내주세요.</p>'''
        support = '''<h1>작은 궁금증도,<br>차근차근 함께.</h1><p class="intro">TypeCat 시작부터 소리와 친구 설정까지 안내합니다.</p><div class="notice"><p>TypeCat은 Mac App Store 출시를 준비하고 있습니다. 공개 버전은 기본 캐릭터 4종과 소리 12종을 제공하며, 앱 내 구입이나 구독은 없습니다.</p></div><div class="support-top"><h2>처음 시작하는 세 단계.</h2><ol><li>응용 프로그램에서 TypeCat을 실행한 뒤 메뉴바 아이콘을 누릅니다.</li><li>시스템 설정 → 개인정보 보호 및 보안 → 입력 모니터링에서 TypeCat을 허용합니다.</li><li>환경설정 → 키보드 연결 테스트를 열고 실제 키를 다섯 번 누릅니다. 5/5가 표시되어야 글로벌 입력 전달이 확인된 것입니다.</li></ol></div>
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
