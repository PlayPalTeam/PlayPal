import Link from "next/link";
import Emoji from "../Emoji";

export default function Hero() {
  return (
    <div className="flex h-[400px] w-full flex-row items-center justify-center gap-[10px] bg-secondary p-5 md:h-[800px] md:px-[50px] md:py-[100px]">
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
            href={"/login"}
          >
            Join
          </Link>
        </div>
        <div className="flex h-min w-full flex-row content-end items-end justify-center gap-[10px]">
          <h1 className="whitespace-pre-wrap text-left font-margarine text-[30px] leading-1.1 tracking-none md:text-[80px]">
            Elevate your turf game with PlayPal.
          </h1>
        </div>
      </div>
    </div>
  );
}
