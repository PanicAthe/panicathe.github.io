import { useLanguage } from '../../contexts/LanguageContext';
import './Marquee.css';

function Marquee({ items = [] }) {
  const { t } = useLanguage();
  if (items.length === 0) return null;

  const line = items.map((item) => item.toUpperCase()).join(' ✦ ') + ' ✦';

  return (
    <div className="marquee">
      <p className="visually-hidden">{t.marquee.label}: {items.join(', ')}</p>
      <div className="marquee__band" aria-hidden="true">
        <div className="marquee__track">
          <span>{line}</span>
          <span>{line}</span>
        </div>
      </div>
    </div>
  );
}

export default Marquee;
