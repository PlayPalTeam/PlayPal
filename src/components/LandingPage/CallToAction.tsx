import Link from 'next/link';
import { Shape17 } from '../Icons/Shape17';

export default function CallToAction() {
  return (
    <div className="flex h-min w-full flex-shrink-0 flex-col flex-nowrap content-center items-center justify-center gap-[20px] overflow-visible bg-[#004b23] p-[100px]">
      <Shape17 angle={40} endColor="#006400" height="80" startColor="#70E000" width="80" />
      <h2 className="h-auto w-full max-w-[800px] overflow-visible whitespace-pre-wrap break-words text-center font-staat text-5xl leading-default text-[#9ef01a]">
        Ready, Set, Play!
      </h2>
      <p className="h-auto w-[411px] max-w-full overflow-visible whitespace-pre-wrap break-words text-center font-manrope text-base leading-normal text-[#9ef01a]">
        Join the PlayPal community and experience the future of turf booking. Create your account
        today and brace for infinite sports thrills.
      </p>
      <div className="flex flex-row flex-nowrap content-center items-center justify-center gap-[10px] overflow-hidden pt-[10px] text-center font-manrope text-sm leading-default">
        <Link href={'/'} className="rounded-lg bg-[#70e000] p-[15px]">
          Book Turf
        </Link>
        <Link href={'/'} className="rounded-lg bg-[#70e000] p-[15px]">
          List Turf
        </Link>
      </div>
    </div>
  );
}
