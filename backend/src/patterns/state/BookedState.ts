import { SeatState } from './SeatState';

// Concrete State - Booked
export class BookedState implements SeatState {
  private bookingId: string;

  constructor(bookingId: string) {
    this.bookingId = bookingId;
  }

  public lock(seat: any, userId: string): boolean {
    console.log('[STATE] Cannot lock a booked seat');
    return false;
  }

  public release(seat: any): boolean {
    console.log('[STATE] Cannot release a booked seat');
    return false;
  }

  public book(seat: any, bookingId: string): boolean {
    console.log('[STATE] Seat is already booked');
    return false;
  }

  public isAvailable(): boolean {
    return false;
  }

  public getName(): string {
    return 'booked';
  }

  public getBookingId(): string {
    return this.bookingId;
  }
}
