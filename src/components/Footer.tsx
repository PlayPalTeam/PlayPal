import Image from 'next/image';
import { memo } from 'react';

const Footer = () => {
  return (
    <footer className="footer footer-center bg-primary p-8 text-primary-content">
      <div>
        <p className="font-bold">
          PlayPal Team <br />
          Providing reliable tech since 2023
        </p>
        <p>Copyright © 2023 - All right reserved</p>
      </div>
    </footer>
  );
};

export default memo(Footer);
