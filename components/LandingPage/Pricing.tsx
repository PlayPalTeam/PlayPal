import PricingCard, { PricingCardProps } from "./PricingCard";

const Pricing_Features: PricingCardProps[] = [
  {
    title: "Casual",
    price: "5.99",
    features: [
      { text: "2 Turfs" },
      { text: "4 Bookings" },
      { text: "Join Games" },
      { text: "Notifications" },
    ],
    buttonText: "Kickoff Now",
    symbol: "👟",
  },
  {
    title: "Pro",
    price: "9.99",
    features: [
      { text: "Unlimited Turfs" },
      { text: "Unlimited Bookings" },
      { text: "Host Games" },
      { text: "Priority Access" },
    ],
    buttonText: "Upgrade Now",
    symbol: "🏆",
  },
  {
    title: "Team",
    price: "14.99",
    features: [
      { text: "Team Access" },
      { text: "Dedicated Support" },
      { text: "Advanced Booking" },
      { text: "Custom Events" },
    ],
    buttonText: "Enlist Now",
    symbol: "🌟",
  },
];

export default function Pricing() {
  return (
    <div className="flex h-min w-full flex-col items-center justify-start bg-white p-5 md:p-[100px]">
      <div className="flex h-min w-full max-w-[1000px] flex-1 flex-col md:flex-row items-start justify-center gap-[20px]">
        {Pricing_Features.map((card) => (
          <PricingCard key={card.title} {...card} />
        ))}
      </div>
    </div>
  );
}
