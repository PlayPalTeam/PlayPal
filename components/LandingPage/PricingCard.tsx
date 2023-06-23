import Emoji from "../Emoji";

export interface PricingCardProps {
  title: string;
  price: string;
  features: Feature[];
  buttonText: string;
  symbol: string;
}

interface Feature {
  text: string;
}

function Feature({ text }: Feature) {
  return (
    <div className="flex h-min w-full flex-1 flex-row items-center justify-start gap-[10px]">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16">
        <path
          d="M 14.531 5.031 L 6.531 13.031 C 6.39 13.172 6.199 13.251 5.999 13.251 C 5.8 13.251 5.609 13.172 5.468 13.031 L 1.968 9.531 C 1.675 9.237 1.675 8.762 1.968 8.468 C 2.262 8.175 2.737 8.175 3.031 8.468 L 6 11.437 L 13.469 3.969 C 13.763 3.676 14.238 3.676 14.532 3.969 C 14.825 4.263 14.825 4.738 14.532 5.032 Z"
          fill="#000000"
        ></path>
      </svg>
      <p className="font-instrument_sans text-sm leading-normal">{text}</p>
    </div>
  );
}

export default function PricingCard({
  features,
  price,
  title,
  buttonText,
  symbol,
}: PricingCardProps) {
  return (
    <div className="relative flex h-min w-full flex-1 flex-col items-start justify-start gap-[20px] rounded-[30px] bg-[#f2f2f2] p-10 shadow-pricing-card-shadow">
      <p className="h-auto w-auto flex-shrink-0 whitespace-pre text-left font-instrument_sans text-sm leading-normal tracking-none text-black">
        {title}
      </p>
      <p className="h-12 w-auto flex-shrink-0 whitespace-pre text-left font-margarine text-[40px] leading-4 tracking-none text-[#1b4332]">
        ${price}
      </p>
      <div className="flex h-min w-full flex-1 flex-col items-center justify-start gap-[10px] py-5">
        {features.map((feature) => (
          <Feature key={feature.text} text={feature.text} />
        ))}
      </div>
      <button className="flex h-10 w-full flex-1 flex-row items-center justify-center gap-[10px] rounded-lg bg-secondary p-[15px]">
        <p className="h-auto w-auto whitespace-pre text-center font-instrument_sans text-sm leading-1.2 tracking-none text-white">
          {buttonText}
        </p>
      </button>
      <Emoji symbol={symbol} size={42} className="-top-3 -right-2 absolute" />
    </div>
  );
}
