import { SeatState } from './SeatState';
import { AvailableState } from './AvailableState';
import { LockedState } from './LockedState';
import { BookedState } from './BookedState';

// Context class that manages seat state
export class SeatContext {
  private seatId: string;
  private state: SeatState;

  constructor(seatId: string) {
    this.seatId = seatId;
    this.state = new AvailableState();
  }

  // Change state
  public setState(state: SeatState): void {
    this.state = state;
    console.log(`[SEAT ${this.seatId}] State changed to: ${state.getName()}`);
  }

  // Get current state
  public getState(): SeatState {
    return this.state;
  }

  // Business methods that delegate to state
  public lock(userId: string): boolean {
    if (this.state.lock(this, userId)) {
      this.setState(new LockedState(userId));
      return true;
    }
    return false;
  }

  public release(): boolean {
    if (this.state.release(this)) {
      this.setState(new AvailableState());
      return true;
    }
    return false;
  }

  public book(bookingId: string): boolean {
    if (this.state.book(this, bookingId)) {
      this.setState(new BookedState(bookingId));
      return true;
    }
    return false;
  }

  public isAvailable(): boolean {
    return this.state.isAvailable();
  }

  public getSeatId(): string {
    return this.seatId;
  }
}
