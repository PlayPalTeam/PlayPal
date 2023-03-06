import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

export default function PageTransition({ children }) {
  const { asPath } = useRouter();
  const [direction, setDirection] = useState('enter');

  function handleEnter() {
    setDirection('enter');
  }

  function handleLeave() {
    setDirection('leave');
  }

  return (
    <AnimatePresence key={asPath} presenceAffectsLayout>
      <motion.div
        key={asPath}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
        onAnimationStart={direction === 'enter' ? null : handleLeave}
        onAnimationComplete={direction === 'enter' ? handleEnter : null}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
