import Image from "next/image";

export default function Section() {
  return (
    <div className="flex h-min w-full flex-col items-center justify-start gap-[60px] bg-white max-md:px-[20px] max-md:py-[60px] md:p-[100px]">
      <div className="flex h-[480px] w-[1000px] max-w-full flex-col-reverse items-center justify-center gap-[40px] md:flex-row md:gap-[60px]">
        <div className="flex h-min w-full flex-1 flex-col items-start justify-center gap-[20px] text-secondary">
          <h3 className="text-left font-margarine text-3xl leading-1.2">
            Find your perfect turf playground
          </h3>
          <h3 className="font-instrument_sans leading-normal">
            PlayPal’s exclusive turf-finder connects you to top-of-the-line turf
            venues across the city. Book, play, and score like a pro!
          </h3>
        </div>
        <Image
          src={
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.cJ6weZfkezpF98barhhpcQHaEr%26pid%3DApi&f=1&ipt=336bc33f3e5f5399b82d8d3689778ef7aecd9ad433dd441847cf9cafe60f28c1&ipo=images"
          }
          alt=""
          width={3200}
          height={2019}
          className="aspect-[0.98/1] h-[300px] w-[1fr] flex-1 rounded-[20px] bg-cover bg-center bg-no-repeat mix-blend-luminosity grayscale md:rounded-[40px]"
        />
      </div>
      <div className="flex h-min w-[1000px] max-w-full flex-col items-center justify-center gap-[40px] md:flex-row md:gap-[60px]">
        <Image
          src={
            "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.j2RKQPOFH1-gUwHeHudtCAHaFj%26pid%3DApi&f=1&ipt=224a924717af23429e08fc4b5f03028e1c0834cd442e029edf4bc9fafaa32b99&ipo=images"
          }
          alt=""
          width={2048}
          height={1536}
          className="aspect-[0.98/1] h-[300px] w-[1fr] flex-1 rounded-[20px] bg-cover bg-center bg-no-repeat mix-blend-luminosity grayscale md:rounded-[40px]"
        />
        <div className="flex h-min w-full flex-1 flex-col items-start justify-center gap-[20px] text-secondary">
          <h3 className="text-left font-margarine text-3xl leading-1.2">
            Create requests and grow your squad
          </h3>
          <h3 className="font-instrument_sans leading-normal">
            Host games, invite friends, and meet fellow soccer enthusiasts. Make
            every match a memorable experience with PlayPal.
          </h3>
        </div>
      </div>
    </div>
  );
}
