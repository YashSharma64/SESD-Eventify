import { v4 as uuidv4 } from 'uuid';

export enum SeatStatus {
  AVAILABLE = 'available',
  LOCKED = 'locked',
  BOOKED = 'booked'
}

export enum SeatType {
  GENERAL = 'general',
  VIP = 'vip',
  PREMIUM = 'premium'
}

export class Seat {
  private id: string;
  private venueId: string;
  private seatNumber: string;
  private rowNumber: string;
  private section: string;
  private seatType: SeatType;
  private status: SeatStatus;
  private lockedBy?: string;
  private lockedAt?: Date;

  constructor(
    venueId: string,
    seatNumber: string,
    rowNumber: string,
    section: string,
    seatType: SeatType = SeatType.GENERAL
  ) {
    this.id = uuidv4();
    this.venueId = venueId;
    this.seatNumber = seatNumber;
    this.rowNumber = rowNumber;
    this.section = section;
    this.seatType = seatType;
    this.status = SeatStatus.AVAILABLE;
  }

  // Simple getters
  public getId(): string { return this.id; }
  public getVenueId(): string { return this.venueId; }
  public getSeatNumber(): string { return this.seatNumber; }
  public getRow(): string { return this.rowNumber; }
  public getSection(): string { return this.section; }
  public getStatus(): SeatStatus { return this.status; }
  public getType(): SeatType { return this.seatType; }

  // Simple state management
  public isAvailable(): boolean {
    return this.status === SeatStatus.AVAILABLE;
  }

  public lock(userId: string): boolean {
    if (this.status !== SeatStatus.AVAILABLE) return false;
    this.status = SeatStatus.LOCKED;
    this.lockedBy = userId;
    this.lockedAt = new Date();
    return true;
  }

  public release(): boolean {
    if (this.status !== SeatStatus.LOCKED) return false;
    this.status = SeatStatus.AVAILABLE;
    this.lockedBy = undefined;
    this.lockedAt = undefined;
    return true;
  }

  public book(): boolean {
    if (this.status === SeatStatus.BOOKED) return false;
    this.status = SeatStatus.BOOKED;
    return true;
  }

  // Convert to JSON
  public toJSON(): any {
    return {
      id: this.id,
      venueId: this.venueId,
      seatNumber: this.seatNumber,
      rowNumber: this.rowNumber,
      section: this.section,
      seatType: this.seatType,
      status: this.status,
      lockedBy: this.lockedBy,
      lockedAt: this.lockedAt
    };
  }
}
