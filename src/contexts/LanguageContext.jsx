import { createContext, useContext, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import { messages } from '../data/messages';
import { getPortfolio } from '../data/portfolio';

// 언어는 주소로 정한다: /en 으로 시작하면 영어, 나머지는 한국어 (공유한 링크가 같은 언어로 열리도록)
const EN_PREFIX = /^\/en(?=\/|$)/;

const LanguageContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useLanguage = () => useContext(LanguageContext);

export function LanguageProvider({ children }) {
  const { pathname } = useLocation();
  const lang = EN_PREFIX.test(pathname) ? 'en' : 'ko';

  const value = useMemo(() => {
    const prefix = lang === 'en' ? '/en' : '';
    const basePath = pathname.replace(EN_PREFIX, '') || '/';

    return {
      lang,
      t: messages[lang],
      content: getPortfolio(lang),
      // '/project/1' → 현재 언어의 주소 ('/en/project/1')
      localePath: (path = '/') => prefix + (path === '/' ? '' : path) || '/',
      // 지금 보고 있는 화면의 다른 언어 주소
      otherLang: lang === 'en' ? 'ko' : 'en',
      otherLangPath: lang === 'en' ? basePath : `/en${basePath === '/' ? '' : basePath}`,
    };
  }, [lang, pathname]);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
