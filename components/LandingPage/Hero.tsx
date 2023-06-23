import Link from "next/link";
import { Logo } from "../Icons/Logo";
import Emoji from "../Emoji";

export default function Hero() {
  return (
    <div className="flex h-[400px] md:h-[800px] md:py-[100px] md:px-[50px] w-full flex-row items-center justify-center gap-[10px] bg-secondary p-5">
      <div className="z-[5] flex h-full w-full max-w-[1000px] flex-1 flex-col items-center justify-between text-primary">
        <div className="flex  h-min w-full flex-row items-center justify-between font-instrument_sans">
          <Emoji symbol="⚽" size={32} />
          <Link
            className="text-left leading-1.2 tracking-none hover:underline hover:underline-offset-2"
            href={"/"}
          >
            Turfs
          </Link>
          <Link
            className="text-left leading-1.2 tracking-none hover:underline hover:underline-offset-2"
            href={"/"}
          >
            Bookings
          </Link>
          <Link
            className="text-left leading-1.2 tracking-none hover:underline hover:underline-offset-2"
            href={"/"}
          >
            Join
          </Link>
        </div>
        <div className="flex h-min w-full flex-row content-end items-end justify-center gap-[10px]">
          <h1 className="whitespace-pre-wrap text-left md:text-[80px] font-margarine text-[30px] leading-1.1 tracking-none">
            Elevate your turf game with PlayPal.
          </h1>
        </div>
      </div>
    </div>
  );
}
