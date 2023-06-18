import {Flower} from '@/components/Icons/Flower';
import {HourGlass} from '@/components/Icons/HourGlass';

export default function Text() {
  return (
    <div
      className={`relative flex h-min w-full flex-col flex-nowrap content-center items-center justify-start overflow-hidden bg-[#004b23] p-[100px]`}
    >
      <div className="relative z-10 flex h-min w-full flex-1 flex-shrink-0 flex-row flex-nowrap content-center items-center justify-between overflow-hidden">
        <div className="relative flex h-min w-full max-w-[600px] flex-1 flex-shrink-0 flex-col flex-nowrap content-start items-start justify-center gap-[40px] ">
          <h2
            className={`relative h-auto w-full flex-shrink-0 overflow-visible whitespace-pre-wrap break-words font-staat text-5xl leading-[1.2] text-[#70e000]`}
          >
            Elevate Your Game with PlayPal
          </h2>
          <h3
            className={`h-auto w-full flex-1 flex-shrink-0 overflow-visible whitespace-pre-wrap break-words font-manrope text-xl leading-6 tracking-tight text-white`}
          >
            Welcome to PlayPal, where the world of turf booking and listing is transformed into a
            seamless experience. Our platform connects players, turf owners, and the love for a good
            game.
          </h3>
          <h3
            className={`h-auto w-full flex-1 flex-shrink-0 overflow-visible whitespace-pre-wrap break-words font-manrope text-xl leading-6 tracking-tight text-white`}
          >
            Discover your next battleground with our ever-growing list of turfs in various
            locations, suited for multiple sports. Create requests for other players and dive into
            adrenaline-pumping gaming action.
          </h3>
          <h3
            className={`h-auto w-full flex-1 flex-shrink-0 overflow-visible whitespace-pre-wrap break-words font-manrope text-xl leading-6 tracking-tight text-white`}
          >
            Don’t settle for less – PlayPal makes organizing and participating in matches a breeze.
            It’s time to unleash the player within you!
          </h3>
        </div>
        <div className="relative flex h-min w-min flex-shrink-0 flex-col flex-nowrap content-center items-center justify-center gap-[40px] overflow-hidden">
          <HourGlass />
          <Flower />
        </div>
      </div>
    </div>
  );
}
