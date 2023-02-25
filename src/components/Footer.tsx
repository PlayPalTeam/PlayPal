import Image from 'next/image';

const Footer = () => {
  return (
    <footer className="footer footer-center p-8 bg-primary text-primary-content">
      <div>
        <Image src={'/logo.svg'} className={`mix-blend-color-burn`} alt={'Logo'} width={400} height={400} />
        <p className="font-bold">
          PlayPal Team <br />
          Providing reliable tech since 2023
        </p>
        <p>Copyright © 2023 - All right reserved</p>
      </div>
    </footer>
  );
};

export default Footer;
