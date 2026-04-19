import { v4 as uuidv4 } from 'uuid';

export enum TicketCategory {
  VIP = 'vip',
  GENERAL = 'general',
  EARLY_BIRD = 'early_bird'
}

export class TicketType {
  private id: string;
  private eventId: string;
  private name: string;
  private description: string;
  private price: number;
  private quantityAvailable: number;
  private quantitySold: number;
  private category: TicketCategory;
  private createdAt: Date;

  constructor(
    eventId: string,
    name: string,
    description: string,
    price: number,
    quantityAvailable: number,
    category: TicketCategory
  ) {
    this.id = uuidv4();
    this.eventId = eventId;
    this.name = name;
    this.description = description;
    this.price = price;
    this.quantityAvailable = quantityAvailable;
    this.quantitySold = 0;
    this.category = category;
    this.createdAt = new Date();
  }

  // Simple getters
  public getId(): string { return this.id; }
  public getEventId(): string { return this.eventId; }
  public getName(): string { return this.name; }
  public getPrice(): number { return this.price; }
  public getCategory(): TicketCategory { return this.category; }
  public getQuantityAvailable(): number { return this.quantityAvailable; }
  public getQuantitySold(): number { return this.quantitySold; }

  // Check availability
  public isAvailable(): boolean {
    return this.quantitySold < this.quantityAvailable;
  }

  public getRemainingQuantity(): number {
    return this.quantityAvailable - this.quantitySold;
  }

  // Sell ticket
  public sell(quantity: number): boolean {
    if (!this.isAvailable() || this.getRemainingQuantity() < quantity) {
      return false;
    }
    this.quantitySold += quantity;
    return true;
  }

  // Convert to JSON
  public toJSON(): any {
    return {
      id: this.id,
      eventId: this.eventId,
      name: this.name,
      description: this.description,
      price: this.price,
      quantityAvailable: this.quantityAvailable,
      quantitySold: this.quantitySold,
      category: this.category,
      createdAt: this.createdAt
    };
  }
}
