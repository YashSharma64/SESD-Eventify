// Strategy Pattern - Payment Processing
// Each payment method is interchangeable

export interface PaymentResult {
  success: boolean;
  transactionId?: string;
  message: string;
}

export interface RefundResult {
  success: boolean;
  refundId?: string;
  message: string;
}

export interface PaymentInfo {
  cardNumber?: string;
  expiryDate?: string;
  cvv?: string;
  email?: string;
  accountNumber?: string;
}

// Strategy Interface
export interface PaymentStrategy {
  pay(amount: number, info: PaymentInfo): Promise<PaymentResult>;
  refund(transactionId: string): Promise<RefundResult>;
}
