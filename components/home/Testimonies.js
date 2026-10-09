import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function Testimonies() {
  const [items, setItems] = useState([]);
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

   useEffect(() => {
    let mounted = true;

    const load = () =>
      fetch('/api/testimonies/public', { cache: 'no-store' })
        .then((r) => r.json())
        .then((d) => {
          if (!mounted) return;
          const fresh = d.testimonies || [];
          setItems((prev) => {
            if (!prev.length) return shuffle(fresh);
            const byId = new Map(fresh.map((f) => [f._id, f]));
            const kept = prev.filter((p) => byId.has(p._id)).map((p) => byId.get(p._id));
            const known = new Set(prev.map((p) => p._id));
            const added = shuffle(fresh.filter((f) => !known.has(f._id)));
            return [...kept, ...added];
          });
          setIndex((i) => i);
        })
        .catch(() => {});

    load();
    const timer = setInterval(load, 30000);
    window.addEventListener('focus', load);
    return () => {
      mounted = false;
      clearInterval(timer);
      window.removeEventListener('focus', load);
    };
  }, []);
  

  useEffect(() => {
    if (items.length < 2 || paused) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % items.length), 7000);
    return () => clearInterval(t);
  }, [items, paused]);

  if (!items.length) return null;
  const t = items[index];
  const preview = items.slice(1, 4).map((_, k) => items[(index + 1 + k) % items.length]);

  return (
    <section className="tm" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="tm-inner">
        <div className="tm-eyebrow">TESTIMONIES</div>
        <h2 className="tm-title">What God Is <em>Doing</em></h2>

        <div className="tm-stage">
          <AnimatePresence mode="wait">
            <motion.blockquote
              key={t._id}
              className="tm-card"
              initial={{ opacity: 0, y: 40, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.97 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <div className="tm-quote">“</div>
              <div className="tm-head">{t.title}</div>
              <p className="tm-text">{t.text}</p>
              <footer className="tm-author">— {t.authorName || 'A student'}</footer>
            </motion.blockquote>
          </AnimatePresence>
        </div>

        {preview.length > 0 && (
          <div className="tm-row">
            {preview.map((p, k) => (
              <motion.button
                key={`${p._id}-${index}`}
                className="tm-mini"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 0.75, y: 0 }}
                transition={{ delay: 0.15 * k, duration: 0.5 }}
                whileHover={{ opacity: 1, y: -4 }}
                onClick={() => setIndex(items.indexOf(p))}
              >
                <strong>{p.title}</strong>
                <span>{p.authorName || 'A student'}</span>
              </motion.button>
            ))}
          </div>
        )}

        {items.length > 1 && (
          <div className="tm-dots">
            {items.slice(0, 12).map((_, i) => (
              <button
                key={i}
                aria-label={`Testimony ${i + 1}`}
                className={i === index % 12 ? 'on' : ''}
                onClick={() => setIndex(i)}
              />
            ))}
          </div>
        )}
      </div>

      <style jsx>{`
        .tm { background: #0a1628; padding: 90px 24px; }
        .tm-inner { max-width: 860px; margin: 0 auto; text-align: center; }
        .tm-eyebrow { font-size: 11px; letter-spacing: 5px; color: rgba(201,146,26,0.75); margin-bottom: 14px; font-weight: 700; }
        .tm-title { font-family: 'Playfair Display', serif; font-size: clamp(28px, 4vw, 42px); font-weight: 900; color: #fff; margin-bottom: 38px; }
        .tm-title em { color: #c9921a; font-style: italic; }
        .tm-stage { min-height: 280px; display: flex; align-items: center; justify-content: center; }
        .tm-card { margin: 0; width: 100%; padding: 38px 34px; border-radius: 16px; background: rgba(255,255,255,0.05); border: 1px solid rgba(201,146,26,0.25); backdrop-filter: blur(10px); }
        .tm-quote { font-family: 'Playfair Display', serif; font-size: 60px; line-height: 0.6; color: #c9921a; }
        .tm-head { font-family: 'Barlow Condensed', sans-serif; font-size: 15px; font-weight: 800; letter-spacing: 2px; color: #c9921a; margin: 12px 0; text-transform: uppercase; }
        .tm-text { font-size: 17px; line-height: 1.8; color: rgba(255,255,255,0.82); max-height: 220px; overflow-y: auto; }
        .tm-author { margin-top: 18px; font-size: 12px; letter-spacing: 2px; color: rgba(255,255,255,0.5); text-transform: uppercase; }
        .tm-row { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 26px; }
        .tm-mini { flex: 1; min-width: 170px; max-width: 240px; padding: 14px; text-align: left; background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.08); border-radius: 10px; color: #fff; cursor: pointer; display: flex; flex-direction: column; gap: 4px; }
        .tm-mini strong { font-size: 12px; }
        .tm-mini span { font-size: 10px; color: rgba(255,255,255,0.45); letter-spacing: 1px; }
        .tm-dots { display: flex; gap: 8px; justify-content: center; margin-top: 26px; }
        .tm-dots button { width: 8px; height: 8px; border-radius: 50%; border: none; background: rgba(255,255,255,0.2); cursor: pointer; padding: 0; }
        .tm-dots button.on { background: #c9921a; transform: scale(1.3); }
      `}</style>
    </section>
  );
}