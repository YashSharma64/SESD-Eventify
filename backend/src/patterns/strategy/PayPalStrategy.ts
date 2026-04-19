import { PaymentStrategy, PaymentResult, RefundResult, PaymentInfo } from './PaymentStrategy';

// Concrete Strategy - PayPal Payment
export class PayPalStrategy implements PaymentStrategy {
  async pay(amount: number, info: PaymentInfo): Promise<PaymentResult> {
    // Simulate PayPal payment processing
    if (!info.email) {
      return {
        success: false,
        message: 'Invalid PayPal account'
      };
    }

    // Simulate processing delay
    await this.delay(700);

    // Mock success
    const success = Math.random() > 0.05; // 95% success rate

    return {
      success,
      transactionId: success ? `PP_${Date.now()}` : undefined,
      message: success ? 'PayPal payment successful' : 'PayPal payment failed'
    };
  }

  async refund(transactionId: string): Promise<RefundResult> {
    await this.delay(400);

    return {
      success: true,
      refundId: `PP_REFUND_${Date.now()}`,
      message: 'PayPal refund processed'
    };
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
