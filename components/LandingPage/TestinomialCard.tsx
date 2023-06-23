import Image from "next/image";
import Emoji from "../Emoji";

export interface TestinomialCardProps {
  imageUrl: string;
  symbol: string;
  text: string;
  name: string;
}

export default function TestinomialCard({
  imageUrl,
  symbol,
  name,
  text,
}: TestinomialCardProps) {
  return (
    <div className="flex h-[400px] w-full flex-1 flex-col content-start items-start justify-start gap-[40px] rounded-[20px] bg-[#f2f2f2] p-10">
      <div className="relative">
        <Image
          src={imageUrl}
          alt=""
          width={100}
          height={100}
          className="aspect-square h-[50px] w-[50px] flex-shrink-0 rounded-full bg-cover bg-center bg-no-repeat"
        />
        <Emoji
          symbol={symbol}
          size={20}
          className="absolute -bottom-1 -right-1"
        />
      </div>
      <div className="flex h-full w-full flex-1 flex-col items-start justify-start gap-[20px] font-instrument_sans leading-normal">
        <h3 className="h-full w-full flex-1 flex-shrink-0 whitespace-pre-wrap text-left text-xl  tracking-tight text-[#081c15]">
          {text}
        </h3>
        <p className="h-auto w-auto whitespace-pre text-sm">{name}</p>
      </div>
    </div>
  );
}
