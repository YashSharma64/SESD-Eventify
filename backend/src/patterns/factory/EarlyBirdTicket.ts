import { Ticket, TicketCategory, TicketData } from './Ticket';
import { v4 as uuidv4 } from 'uuid';

// Concrete Product - Early Bird Ticket
export class EarlyBirdTicket implements Ticket {
  public id: string;
  public eventId: string;
  public seatId: string;
  public userId: string;
  public price: number;
  public category: TicketCategory;
  public createdAt: Date;

  constructor(data: TicketData) {
    this.id = uuidv4();
    this.eventId = data.eventId;
    this.seatId = data.seatId;
    this.userId = data.userId;
    this.price = data.price * 0.8; // 20% discount for early birds
    this.category = TicketCategory.EARLY_BIRD;
    this.createdAt = new Date();
  }

  public getType(): string {
    return 'Early Bird Ticket';
  }

  public getBenefits(): string[] {
    return [
      'Standard seating',
      'Event access',
      '20% discount',
      'Priority entry'
    ];
  }
}
