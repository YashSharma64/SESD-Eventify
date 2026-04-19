import { User, UserRole, VerificationStatus } from './User';

export interface EventData {
  title: string;
  description: string;
  venueId: string;
  startTime: Date;
  endTime: Date;
  basePrice: number;
  maxAttendees: number;
}

export interface Event {
  id: string;
  organizerId: string;
  title: string;
  description: string;
  status: 'draft' | 'published' | 'cancelled' | 'completed';
  createdAt: Date;
}

export interface EventAnalytics {
  totalBookings: number;
  totalRevenue: number;
  attendeesCount: number;
}

// Organizer class - Demonstrates INHERITANCE
export class Organizer extends User {
  private events: Event[] = [];
  private verificationStatus: VerificationStatus;

  constructor(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phone?: string
  ) {
    super(email, password, firstName, lastName, phone);
    this.verificationStatus = VerificationStatus.PENDING;
  }

  // Implements abstract method - Demonstrates POLYMORPHISM
  public getRole(): UserRole {
    return UserRole.ORGANIZER;
  }

  // Organizer-specific methods
  public createEvent(eventData: EventData): Event {
    const event: Event = {
      id: this.generateId(),
      organizerId: this.getId(),
      title: eventData.title,
      description: eventData.description,
      status: 'draft',
      createdAt: new Date()
    };
    
    this.events.push(event);
    this.updatedAt = new Date();
    return event;
  }

  public manageEvent(eventId: string, updates: Partial<Event>): Event | null {
    const event = this.events.find(e => e.id === eventId);
    if (event) {
      Object.assign(event, updates);
      this.updatedAt = new Date();
      return event;
    }
    return null;
  }

  public viewAnalytics(): EventAnalytics {
    return {
      totalBookings: this.events.length * 10, // Mock data
      totalRevenue: this.events.length * 1000, // Mock data
      attendeesCount: this.events.length * 50 // Mock data
    };
  }

  public approveBooking(bookingId: string): boolean {
    // Mock implementation
    this.updatedAt = new Date();
    return true;
  }

  public getVerificationStatus(): VerificationStatus {
    return this.verificationStatus;
  }

  public setVerificationStatus(status: VerificationStatus): void {
    this.verificationStatus = status;
    this.updatedAt = new Date();
  }

  public getEvents(): Event[] {
    return this.events;
  }

  private generateId(): string {
    return `evt_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  // Override toJSON to include organizer-specific data
  public toJSON(): any {
    return {
      ...super.toJSON(),
      eventsCount: this.events.length,
      verificationStatus: this.verificationStatus
    };
  }
}
