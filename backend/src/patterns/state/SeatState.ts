// State Pattern - Seat State Management
// Seat behavior changes based on its state

// State Interface
export interface SeatState {
  lock(seat: any, userId: string): boolean;
  release(seat: any): boolean;
  book(seat: any, bookingId: string): boolean;
  isAvailable(): boolean;
  getName(): string;
}
