import { Facebook, Instagram, Sun, Twitch, Twitter } from '../Icons';

export default function Footer() {
  return (
    <div className="relative box-border flex h-min w-full flex-1 flex-shrink-0 flex-col flex-nowrap content-center items-center justify-center gap-[20px] overflow-hidden bg-[#004b23] p-[100px]">
      <Sun angle={315} width="80" height="80" endColor="#006400" startColor="#9EF01A" />
      <div className="relative flex h-min w-min flex-shrink-0 flex-row flex-nowrap content-center items-center justify-start gap-[20px] overflow-visible">
        <Twitter />
        <Instagram />
        <Facebook />
        <Twitch />
      </div>
      <p className="h-auto w-auto flex-shrink-0 overflow-visible whitespace-pre text-left font-manrope text-base font-medium leading-normal text-[#ccff33]">
        © 2023 PlayPal. All Rights Reserved.
      </p>
    </div>
  );
}
