import { PaymentStrategy, PaymentResult, RefundResult, PaymentInfo } from './PaymentStrategy';
import { CreditCardStrategy } from './CreditCardStrategy';
import { PayPalStrategy } from './PayPalStrategy';
import { BankTransferStrategy } from './BankTransferStrategy';

// Context class that uses the strategy
export class PaymentService {
  private strategy: PaymentStrategy;

  constructor(strategy: PaymentStrategy) {
    this.strategy = strategy;
  }

  // Change strategy at runtime
  public setStrategy(strategy: PaymentStrategy): void {
    this.strategy = strategy;
  }

  // Execute payment using current strategy
  public async processPayment(amount: number, info: PaymentInfo): Promise<PaymentResult> {
    console.log(`Processing payment of $${amount}`);
    return await this.strategy.pay(amount, info);
  }

  // Process refund using current strategy
  public async processRefund(transactionId: string): Promise<RefundResult> {
    console.log(`Processing refund for transaction ${transactionId}`);
    return await this.strategy.refund(transactionId);
  }
}

// Factory method to create payment service with specific strategy
export function createPaymentService(method: 'credit_card' | 'paypal' | 'bank_transfer'): PaymentService {
  let strategy: PaymentStrategy;

  switch (method) {
    case 'credit_card':
      strategy = new CreditCardStrategy();
      break;
    case 'paypal':
      strategy = new PayPalStrategy();
      break;
    case 'bank_transfer':
      strategy = new BankTransferStrategy();
      break;
    default:
      throw new Error(`Unsupported payment method: ${method}`);
  }

  return new PaymentService(strategy);
}
