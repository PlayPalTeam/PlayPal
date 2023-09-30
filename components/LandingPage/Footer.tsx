export default function Footer() {
  return (
    <div className="flex h-min w-full flex-col content-center items-center justify-center border-t border-solid border-black/5 bg-white p-5 md:p-[100px]">
      <div className="flex h-min w-full max-w-[1000px] flex-1 flex-col content-start items-start justify-start gap-[40px] md:flex-row">
        <div className="flex h-min flex-shrink-0 flex-col items-start justify-start gap-[15px] md:w-[300px]">
          <p>Support</p>
          <div className="flex h-min w-min flex-col content-start items-start justify-start gap-[10px]">
            <p>Help</p>
            <p>Contact</p>
            <p>FAQ</p>
          </div>
        </div>
        <div className="flex h-min flex-shrink-0 flex-col items-start justify-start gap-[15px] md:w-[300px]">
          <p>Social</p>
          <div className="flex h-min w-min flex-col content-start items-start justify-start gap-[10px]">
            <p>Facebook</p>
            <p>Instagram</p>
            <p>Twitter</p>
          </div>
        </div>
        <div className="flex h-min flex-shrink-0 flex-col items-start justify-start gap-[15px] md:w-[300px]">
          <p>Legal</p>
          <div className="flex h-min w-min flex-col content-start items-start justify-start gap-[10px]">
            <p>Privacy</p>
            <p>Terms</p>
            <p>Cookies</p>
          </div>
        </div>
      </div>
      <div className="flex h-min w-full flex-col"></div>
    </div>
  );
}
