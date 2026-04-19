import { useState } from 'react';
import { CreditCard, Landmark, Wallet } from 'lucide-react';

interface PaymentSelectorProps {
  onConfirm: () => void;
  totalPrice: number;
}

const strategies = [
  { id: 'credit', name: 'Credit Card', icon: CreditCard, description: 'Standard processing fee' },
  { id: 'paypal', name: 'PayPal', icon: Wallet, description: 'Quick and secure checkout' },
  { id: 'bank', name: 'Bank Transfer', icon: Landmark, description: 'Direct from your account' },
];

const PaymentSelector = ({ onConfirm, totalPrice }: PaymentSelectorProps) => {
  const [selectedMethod, setSelectedMethod] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = () => {
    setIsProcessing(true);
    // Simulate backend payment strategy invocation
    setTimeout(() => {
      setIsProcessing(false);
      onConfirm();
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {strategies.map((method) => {
          const Icon = method.icon;
          const isSelected = selectedMethod === method.id;
          
          return (
            <button
              key={method.id}
              onClick={() => setSelectedMethod(method.id)}
              className={`p-4 rounded-xl border text-left transition-all ${
                isSelected 
                  ? 'bg-accent-blue/10 border-accent-blue shadow-[0_0_15px_rgba(59,130,246,0.15)] scale-[1.02]' 
                  : 'bg-dark-bg border-dark-border hover:border-gray-500 text-gray-400'
              }`}
            >
              <Icon className={`mb-3 ${isSelected ? 'text-accent-blue' : 'text-gray-500'}`} size={24} />
              <h4 className={`font-semibold mb-1 ${isSelected ? 'text-white' : ''}`}>{method.name}</h4>
              <p className="text-xs text-gray-500">{method.description}</p>
            </button>
          );
        })}
      </div>

      <div className="pt-4 flex justify-end">
        <button
          onClick={handlePay}
          disabled={!selectedMethod || isProcessing}
          className={`px-8 py-3 rounded-xl font-bold transition-all flex items-center gap-2 ${
            !selectedMethod 
              ? 'bg-dark-bg border border-dark-border text-gray-600 cursor-not-allowed'
              : 'bg-gradient-to-r from-accent-blue to-accent-purple text-white hover:shadow-lg hover:shadow-accent-blue/20 hover:scale-105'
          }`}
        >
          {isProcessing ? (
            <span className="animate-pulse">Processing...</span>
          ) : (
            `Pay $${totalPrice.toFixed(2)}`
          )}
        </button>
      </div>
    </div>
  );
};

export default PaymentSelector;
