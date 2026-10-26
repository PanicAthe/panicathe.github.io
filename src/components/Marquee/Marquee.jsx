import './Marquee.css';

function Marquee({ items = [] }) {
  if (items.length === 0) return null;

  const line = items.map((item) => item.toUpperCase()).join(' ✦ ') + ' ✦';

  return (
    <div className="marquee">
      <p className="visually-hidden">주요 기술: {items.join(', ')}</p>
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
