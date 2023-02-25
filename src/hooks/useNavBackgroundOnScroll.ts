import { useEffect, useState } from 'react';

const useNavBackgroundOnScroll = () => {
  const [applyBackground, setApplyBackground] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 20) {
        setApplyBackground(true);
      } else {
        setApplyBackground(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return applyBackground;
};

export default useNavBackgroundOnScroll;
