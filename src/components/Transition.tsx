import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

export default function PageTransition({ children }) {
  const { asPath } = useRouter();

  return (
    <AnimatePresence key={asPath} presenceAffectsLayout>
      <motion.div
        key={asPath}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: 'easeInOut' }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
