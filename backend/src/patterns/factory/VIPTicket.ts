import { Ticket, TicketCategory, TicketData } from './Ticket';
import { v4 as uuidv4 } from 'uuid';

// Concrete Product - VIP Ticket
export class VIPTicket implements Ticket {
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
    this.price = data.price * 1.5; // VIP costs 50% more
    this.category = TicketCategory.VIP;
    this.createdAt = new Date();
  }

  public getType(): string {
    return 'VIP Ticket';
  }

  public getBenefits(): string[] {
    return [
      'Priority seating',
      'Exclusive lounge access',
      'Complimentary drinks',
      'Meet and greet opportunity'
    ];
  }
}
