import { useState } from 'react'
import './App.css'
import PricingCard from './components/PricingCard'

function App() {
  const [selectedPlan, setSelectedPlan] = useState<string>('Pro')

  const pricingData = [
    {
      plan: 'Standard',
      price: '$100',
      features: ['50,000 Requests', '4 contributors', 'Up to 3 GB storage space']
    },
    {
      plan: 'Pro',
      price: '$200',
      features: ['100,000 Requests', '7 contributors', 'Up to 6 GB storage space']
    },
    {
      plan: 'Expert',
      price: '$500',
      features: ['100,000 Requests', '11 contributors', 'Up to 10 GB storage space']
    }
  ]

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-12">Choose Your Plan</h1>

        <div className="flex flex-col sm:flex-row gap-0 justify-center">
          {pricingData.map((pricing) => (
            <PricingCard
              key={pricing.plan}
              plan={pricing.plan}
              price={pricing.price}
              features={pricing.features}
              isFeatured={pricing.plan === selectedPlan}
              onSelect={() => setSelectedPlan(pricing.plan)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
