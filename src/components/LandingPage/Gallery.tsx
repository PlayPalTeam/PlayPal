import Image from 'next/image';
import { Circle } from '../Icons/Circle';
import { Flower } from '../Icons/Flower';
import { HourGlass } from '../Icons/HourGlass';

export default function Gallery() {
  return (
    <div className="relative box-border flex h-min w-full flex-shrink-0 flex-col flex-nowrap content-center items-center justify-start gap-[60] overflow-hidden bg-black p-[100px]">
      <h2 className="relative h-auto w-full max-w-5xl flex-shrink-0 overflow-visible whitespace-pre-wrap break-words text-left font-staat text-5xl leading-default text-[#ccff33]">
        TURF INSPIRATION
      </h2>
      <div className="relative grid h-min w-full max-w-5xl flex-shrink-0 grid-cols-3 grid-rows-2 justify-center gap-[20] overflow-visible text-white mix-blend-luminosity">
        <div className="relative">
          <Image
            className="block aspect-custom h-[500px] w-[294px] flex-shrink-0 self-start justify-self-start overflow-hidden rounded-[40px] bg-cover bg-center bg-no-repeat grayscale"
            src={'/BasketBall.jpg'}
            alt=""
            width={294}
            height={500}
          />
          <Circle className="absolute bottom-20 right-20 h-[200] w-[200]" />
        </div>
        <div>
          <Image src={'/Cricket.jpg'} alt="" width={100} height={100} />2
        </div>
        <div>
          <Image src={'/Soccer.jpg'} alt="" width={100} height={100} />
          <HourGlass />
        </div>
        <div>4</div>
        <div>
          <Flower />
        </div>
        <div>6</div>
      </div>
    </div>
  );
}
