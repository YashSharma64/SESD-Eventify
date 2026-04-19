import { PaymentStrategy, PaymentResult, RefundResult, PaymentInfo } from './PaymentStrategy';

// Concrete Strategy - Credit Card Payment
export class CreditCardStrategy implements PaymentStrategy {
  async pay(amount: number, info: PaymentInfo): Promise<PaymentResult> {
    // Simulate credit card payment processing
    if (!info.cardNumber || !info.expiryDate || !info.cvv) {
      return {
        success: false,
        message: 'Invalid credit card details'
      };
    }

    // Simulate processing delay
    await this.delay(500);

    // Mock success (in real app, would call payment gateway)
    const success = Math.random() > 0.1; // 90% success rate

    return {
      success,
      transactionId: success ? `CC_${Date.now()}` : undefined,
      message: success ? 'Payment successful' : 'Payment failed'
    };
  }

  async refund(transactionId: string): Promise<RefundResult> {
    await this.delay(300);

    return {
      success: true,
      refundId: `REFUND_${Date.now()}`,
      message: 'Refund processed successfully'
    };
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
