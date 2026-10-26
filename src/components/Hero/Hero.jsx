import { lazy, Suspense, useEffect, useState } from 'react';
import cardFace from '../../assets/lanyard/card-face.png';
import './Hero.css';

const Lanyard = lazy(() => import('../Lanyard/Lanyard'));

// 작은 화면·동작 줄이기 설정에서는 3D 대신 정적인 카드를 보여준다
const STATIC_CARD_QUERY = '(max-width: 900px), (prefers-reduced-motion: reduce)';

function useMediaQuery(query) {
  const [matches, setMatches] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);

  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = (e) => setMatches(e.matches);
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
}

function StaticCard() {
  return (
    <div className="hero__static-card" aria-hidden="true">
      <span className="hero__static-strap" />
      <span className="hero__static-clip" />
      <img src={cardFace} alt="" className="hero__static-face" />
    </div>
  );
}

function Hero() {
  const useStaticCard = useMediaQuery(STATIC_CARD_QUERY);

  return (
    <section id="top" className="hero">
      <div className="hero__copy">
        <p className="hero__eyebrow">[ 최은진 — 백엔드 개발자 ]</p>
        <h1 className="hero__title">
          <span className="visually-hidden">최은진, 확장 가능한 시스템을 만드는 백엔드 개발자</span>
          <span aria-hidden="true">
            BUILDS
            <br />
            <span className="hero__title-outline">SYSTEMS</span>
            <br />
            THAT <span className="hero__title-accent">SCALE.</span>
          </span>
        </h1>
        <p className="hero__intro">
          확장성 있는 설계와 AI·백엔드 융합을 고민합니다. 서버에서 앱, 배포와 운영까지 끝까지 책임진 프로젝트들을 소개합니다.
        </p>
      </div>

      <div className="hero__stage" role="img" aria-label="최은진 사원증 카드 — Backend Developer, panicatheworks@gmail.com">
        {useStaticCard ? (
          <StaticCard />
        ) : (
          <Suspense fallback={<StaticCard />}>
            <Lanyard />
          </Suspense>
        )}
        {!useStaticCard && <p className="hero__hint" aria-hidden="true">드래그해서 카드를 흔들어 보세요</p>}
      </div>
    </section>
  );
}

export default Hero;
