import { v4 as uuidv4 } from 'uuid';

export enum EventStatus {
  DRAFT = 'draft',
  PUBLISHED = 'published',
  CANCELLED = 'cancelled',
  COMPLETED = 'completed'
}

export enum EventCategory {
  CONCERT = 'concert',
  CONFERENCE = 'conference',
  SPORTS = 'sports',
  THEATER = 'theater',
  OTHER = 'other'
}

export class Event {
  private id: string;
  private organizerId: string;
  private venueId: string;
  private title: string;
  private description: string;
  private category: EventCategory;
  private startTime: Date;
  private endTime: Date;
  private status: EventStatus;
  private basePrice: number;
  private maxAttendees: number;
  private createdAt: Date;
  private updatedAt: Date;

  constructor(
    organizerId: string,
    venueId: string,
    title: string,
    description: string,
    category: EventCategory,
    startTime: Date,
    endTime: Date,
    basePrice: number,
    maxAttendees: number
  ) {
    this.id = uuidv4();
    this.organizerId = organizerId;
    this.venueId = venueId;
    this.title = title;
    this.description = description;
    this.category = category;
    this.startTime = startTime;
    this.endTime = endTime;
    this.status = EventStatus.DRAFT;
    this.basePrice = basePrice;
    this.maxAttendees = maxAttendees;
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  // Simple getters
  public getId(): string { return this.id; }
  public getTitle(): string { return this.title; }
  public getOrganizerId(): string { return this.organizerId; }
  public getVenueId(): string { return this.venueId; }
  public getStatus(): EventStatus { return this.status; }
  public getBasePrice(): number { return this.basePrice; }
  public getMaxAttendees(): number { return this.maxAttendees; }

  // Simple setters
  public publish(): void {
    this.status = EventStatus.PUBLISHED;
    this.updatedAt = new Date();
  }

  public cancel(): void {
    this.status = EventStatus.CANCELLED;
    this.updatedAt = new Date();
  }

  public complete(): void {
    this.status = EventStatus.COMPLETED;
    this.updatedAt = new Date();
  }

  // Validation
  public isValid(): boolean {
    return this.startTime < this.endTime && 
           this.basePrice >= 0 && 
           this.maxAttendees > 0;
  }

  // Convert to JSON
  public toJSON(): any {
    return {
      id: this.id,
      organizerId: this.organizerId,
      venueId: this.venueId,
      title: this.title,
      description: this.description,
      category: this.category,
      startTime: this.startTime,
      endTime: this.endTime,
      status: this.status,
      basePrice: this.basePrice,
      maxAttendees: this.maxAttendees,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}
