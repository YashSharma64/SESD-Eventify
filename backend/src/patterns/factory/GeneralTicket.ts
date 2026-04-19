import { Ticket, TicketCategory, TicketData } from './Ticket';
import { v4 as uuidv4 } from 'uuid';

// Concrete Product - General Ticket
export class GeneralTicket implements Ticket {
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
    this.price = data.price; // Standard price
    this.category = TicketCategory.GENERAL;
    this.createdAt = new Date();
  }

  public getType(): string {
    return 'General Ticket';
  }

  public getBenefits(): string[] {
    return [
      'Standard seating',
      'Event access'
    ];
  }
}
