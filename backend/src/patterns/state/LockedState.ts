import { SeatState } from './SeatState';

// Concrete State - Locked
export class LockedState implements SeatState {
  private lockedBy: string;
  private lockedAt: Date;
  private lockDuration: number = 600000; // 10 minutes in ms

  constructor(userId: string) {
    this.lockedBy = userId;
    this.lockedAt = new Date();
  }

  public lock(seat: any, userId: string): boolean {
    console.log('[STATE] Seat is already locked');
    return false;
  }

  public release(seat: any): boolean {
    console.log(`[STATE] Releasing seat locked by ${this.lockedBy}`);
    // Transition back to available
    return true;
  }

  public book(seat: any, bookingId: string): boolean {
    console.log(`[STATE] Booking seat for booking ${bookingId}`);
    // Transition to booked state
    return true;
  }

  public isAvailable(): boolean {
    return false;
  }

  public getName(): string {
    return 'locked';
  }

  public getLockedBy(): string {
    return this.lockedBy;
  }

  public getLockedAt(): Date {
    return this.lockedAt;
  }

  public isExpired(): boolean {
    const now = new Date();
    const elapsed = now.getTime() - this.lockedAt.getTime();
    return elapsed > this.lockDuration;
  }
}
