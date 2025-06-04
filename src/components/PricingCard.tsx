import { type FC, type KeyboardEvent } from 'react';

interface PricingCardProps {
  plan: string;
  price: string;
  features: string[];
  isFeatured?: boolean;
  onSelect: () => void;
}

const PricingCard: FC<PricingCardProps> = ({
  plan,
  price,
  features,
  isFeatured = false,
  onSelect,
}) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
    if (e.key === 'Enter') {
      onSelect();
    }
  };

  return (
    <div
      className={`
        flex flex-col shadow-md transition-all duration-300
        ${isFeatured 
          ? 'bg-[#34495e] text-white -mt-6 -mb-2 pt-10 pb-8 px-6' 
          : 'bg-white text-[#34495e] hover:shadow-xl hover:translate-y-[-4px] p-6'}
        cursor-pointer
      `}
      onClick={onSelect}
      role="region"
      aria-label={`${plan} pricing plan`}
    >
      <h3 className="text-xl font-bold mb-4 text-center">{plan}</h3>
      <div className="text-center mb-4">
        <span className="text-4xl font-bold">{price}</span>
      </div>
      <div className={`h-px w-full ${isFeatured ? 'bg-white' : 'bg-[#34495e]'} opacity-30`}></div>
      <ul className="flex-grow mb-6">
        {features.map((feature, index) => (
          <li key={index} className="text-center py-2 border-b" style={{ borderColor: isFeatured ? 'rgba(255, 255, 255, 0.3)' : 'rgba(52, 73, 94, 0.3)' }}>{feature}</li>
        ))}
      </ul>
      <button
        className="uppercase text-center py-2 mt-auto transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        onClick={(e) => {
          e.stopPropagation();
          onSelect();
        }}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        Subscribe
      </button>
    </div>
  );
};

export default PricingCard;
