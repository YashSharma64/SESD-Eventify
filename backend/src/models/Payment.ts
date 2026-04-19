import { v4 as uuidv4 } from 'uuid';

export enum PaymentMethod {
  CREDIT_CARD = 'credit_card',
  PAYPAL = 'paypal',
  BANK_TRANSFER = 'bank_transfer'
}

export enum PaymentStatus {
  PENDING = 'pending',
  COMPLETED = 'completed',
  FAILED = 'failed',
  REFUNDED = 'refunded'
}

export class Payment {
  private id: string;
  private bookingId: string;
  private amount: number;
  private paymentMethod: PaymentMethod;
  private status: PaymentStatus;
  private transactionId?: string;
  private paymentDate: Date;

  constructor(
    bookingId: string,
    amount: number,
    paymentMethod: PaymentMethod
  ) {
    this.id = uuidv4();
    this.bookingId = bookingId;
    this.amount = amount;
    this.paymentMethod = paymentMethod;
    this.status = PaymentStatus.PENDING;
    this.paymentDate = new Date();
    this.transactionId = this.generateTransactionId();
  }

  // Simple getters
  public getId(): string { return this.id; }
  public getBookingId(): string { return this.bookingId; }
  public getAmount(): number { return this.amount; }
  public getMethod(): PaymentMethod { return this.paymentMethod; }
  public getStatus(): PaymentStatus { return this.status; }
  public getTransactionId(): string | undefined { return this.transactionId; }

  // Simple state management
  public complete(): void {
    this.status = PaymentStatus.COMPLETED;
  }

  public fail(): void {
    this.status = PaymentStatus.FAILED;
  }

  public refund(): void {
    this.status = PaymentStatus.REFUNDED;
  }

  private generateTransactionId(): string {
    return `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Convert to JSON
  public toJSON(): any {
    return {
      id: this.id,
      bookingId: this.bookingId,
      amount: this.amount,
      paymentMethod: this.paymentMethod,
      status: this.status,
      transactionId: this.transactionId,
      paymentDate: this.paymentDate
    };
  }
}
