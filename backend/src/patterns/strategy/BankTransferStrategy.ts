import { PaymentStrategy, PaymentResult, RefundResult, PaymentInfo } from './PaymentStrategy';

// Concrete Strategy - Bank Transfer Payment
export class BankTransferStrategy implements PaymentStrategy {
  async pay(amount: number, info: PaymentInfo): Promise<PaymentResult> {
    // Simulate bank transfer processing
    if (!info.accountNumber) {
      return {
        success: false,
        message: 'Invalid bank account details'
      };
    }

    // Simulate longer processing time for bank transfer
    await this.delay(1000);

    // Bank transfers usually take longer but are more reliable
    return {
      success: true,
      transactionId: `BT_${Date.now()}`,
      message: 'Bank transfer initiated. Will be processed in 2-3 business days'
    };
  }

  async refund(transactionId: string): Promise<RefundResult> {
    await this.delay(600);

    return {
      success: true,
      refundId: `BT_REFUND_${Date.now()}`,
      message: 'Bank refund initiated. Will be processed in 5-7 business days'
    };
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}
