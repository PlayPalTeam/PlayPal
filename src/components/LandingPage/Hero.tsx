import { Circle } from '@/components/Icons/Circle';
import { Logo } from '@/components/Icons/Logo';
import { Star } from '@/components/Icons/Start';

export default function Hero() {
  return (
    <header className="flex h-min w-full flex-shrink-0 flex-col flex-nowrap content-center items-center justify-center gap-[20px] overflow-hidden bg-[#006400] px-5 pb-5 pt-[60px] md:justify-start md:gap-[100px] md:p-[100px]">
      <nav
        className={`flex h-min w-full flex-1 flex-shrink-0 flex-col flex-nowrap content-center items-center justify-center gap-[20px] overflow-hidden font-manrope text-white md:flex-row`}
      >
        <Logo />
        <p className="flex-1">PlayPal</p>
        <p>Home</p>
        <p>Book</p>
        <p>List</p>
      </nav>
      <div className="flex h-min w-full flex-1 flex-shrink-0 flex-row flex-nowrap content-center items-center justify-center gap-[40px] overflow-hidden">
        <Star />
        <Circle />
      </div>
    </header>
  );
}
