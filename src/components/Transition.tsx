import { AnimatePresence, motion } from 'framer-motion';
import { useRouter } from 'next/router';

const variants = {
  out: {
    opacity: 0,
    transition: {
      duration: 0.75,
      ease: 'easeInOut'
    }
  },
  in: {
    opacity: 1,
    transition: {
      duration: 0.75,
      delay: 1,
      ease: 'easeInOut'
    }
  }
};

const Transition = ({ children }: { children: JSX.Element }) => {
  const { asPath } = useRouter();
  return (
    <AnimatePresence initial={false} presenceAffectsLayout>
      <motion.div key={asPath} variants={variants} animate="in" initial="out" exit="out">
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default Transition;
