import { useEffect, useRef } from 'react';
import { motion, useInView, useAnimation } from 'framer-motion';

export default function ScrollReveal({ children, delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });
  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start('visible');
    }
  }, [isInView, controls]);

  return (
    <motion.div
      ref={ref}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0 },
      }}
      initial="hidden"
      animate={controls}
      transition={{ duration: 0.65, delay, ease: 'easeOut' }}
      style={{
        border: 'none',
        outline: 'none',
        boxShadow: 'none',
        background: 'transparent',
      }}
    >
      {children}
    </motion.div>
  );
}