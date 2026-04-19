import { v4 as uuidv4 } from 'uuid';

export enum BookingStatus {
  PENDING = 'pending',
  CONFIRMED = 'confirmed',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded'
}

export class Booking {
  private id: string;
  private userId: string;
  private eventId: string;
  private seatIds: string[];
  private ticketTypeId: string;
  private totalAmount: number;
  private status: BookingStatus;
  private bookingDate: Date;
  private cancelledAt?: Date;

  constructor(
    userId: string,
    eventId: string,
    seatIds: string[],
    ticketTypeId: string,
    totalAmount: number
  ) {
    this.id = uuidv4();
    this.userId = userId;
    this.eventId = eventId;
    this.seatIds = seatIds;
    this.ticketTypeId = ticketTypeId;
    this.totalAmount = totalAmount;
    this.status = BookingStatus.PENDING;
    this.bookingDate = new Date();
  }

  // Simple getters
  public getId(): string { return this.id; }
  public getUserId(): string { return this.userId; }
  public getEventId(): string { return this.eventId; }
  public getSeatIds(): string[] { return this.seatIds; }
  public getTotalAmount(): number { return this.totalAmount; }
  public getStatus(): BookingStatus { return this.status; }
  public getBookingDate(): Date { return this.bookingDate; }

  // Simple state management
  public confirm(): void {
    this.status = BookingStatus.CONFIRMED;
  }

  public cancel(): void {
    this.status = BookingStatus.CANCELLED;
    this.cancelledAt = new Date();
  }

  public refund(): void {
    this.status = BookingStatus.REFUNDED;
    this.cancelledAt = new Date();
  }

  // Convert to JSON
  public toJSON(): any {
    return {
      id: this.id,
      userId: this.userId,
      eventId: this.eventId,
      seatIds: this.seatIds,
      ticketTypeId: this.ticketTypeId,
      totalAmount: this.totalAmount,
      status: this.status,
      bookingDate: this.bookingDate,
      cancelledAt: this.cancelledAt
    };
  }
}
