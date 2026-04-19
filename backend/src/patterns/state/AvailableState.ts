import { SeatState } from './SeatState';

// Concrete State - Available
export class AvailableState implements SeatState {
  public lock(seat: any, userId: string): boolean {
    console.log(`[STATE] Locking seat for user ${userId}`);
    // Transition to locked state
    return true;
  }

  public release(seat: any): boolean {
    console.log('[STATE] Seat is already available');
    return false;
  }

  public book(seat: any, bookingId: string): boolean {
    console.log('[STATE] Cannot book directly. Lock the seat first');
    return false;
  }

  public isAvailable(): boolean {
    return true;
  }

  public getName(): string {
    return 'available';
  }
}
