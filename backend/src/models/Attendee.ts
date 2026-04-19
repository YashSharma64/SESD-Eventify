import { User, UserRole, UserPreferences, Booking } from './User';

// Attendee class - Demonstrates INHERITANCE
export class Attendee extends User {
  private bookingHistory: Booking[] = [];
  private preferences: UserPreferences;

  constructor(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phone?: string
  ) {
    super(email, password, firstName, lastName, phone);
    
    // Default preferences
    this.preferences = {
      emailNotifications: true,
      smsNotifications: false,
      pushNotifications: true,
      language: 'en',
      currency: 'USD'
    };
  }

  // Implements abstract method - Demonstrates POLYMORPHISM
  public getRole(): UserRole {
    return UserRole.ATTENDEE;
  }

  // Attendee-specific methods
  public viewBookingHistory(): Booking[] {
    return this.bookingHistory;
  }

  public addBooking(booking: Booking): void {
    this.bookingHistory.push(booking);
    this.updatedAt = new Date();
  }

  public cancelBooking(bookingId: string): boolean {
    const index = this.bookingHistory.findIndex(b => b.id === bookingId);
    if (index !== -1) {
      this.bookingHistory[index].status = 'cancelled';
      this.updatedAt = new Date();
      return true;
    }
    return false;
  }

  public updatePreferences(preferences: Partial<UserPreferences>): void {
    this.preferences = { ...this.preferences, ...preferences };
    this.updatedAt = new Date();
  }

  public getPreferences(): UserPreferences {
    return this.preferences;
  }

  // Override toJSON to include attendee-specific data
  public toJSON(): any {
    return {
      ...super.toJSON(),
      bookingCount: this.bookingHistory.length,
      preferences: this.preferences
    };
  }
}
