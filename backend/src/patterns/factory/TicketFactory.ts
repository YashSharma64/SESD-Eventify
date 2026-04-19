import { Ticket, TicketCategory, TicketData } from './Ticket';
import { VIPTicket } from './VIPTicket';
import { GeneralTicket } from './GeneralTicket';
import { EarlyBirdTicket } from './EarlyBirdTicket';

// Factory - Creates tickets based on category
export class TicketFactory {
  // Create single ticket
  public static createTicket(category: TicketCategory, data: TicketData): Ticket {
    switch (category) {
      case TicketCategory.VIP:
        return new VIPTicket(data);
      case TicketCategory.GENERAL:
        return new GeneralTicket(data);
      case TicketCategory.EARLY_BIRD:
        return new EarlyBirdTicket(data);
      default:
        throw new Error(`Unknown ticket category: ${category}`);
    }
  }

  // Create multiple tickets at once
  public static createBulkTickets(
    category: TicketCategory,
    quantity: number,
    data: TicketData
  ): Ticket[] {
    const tickets: Ticket[] = [];
    
    for (let i = 0; i < quantity; i++) {
      tickets.push(this.createTicket(category, data));
    }
    
    console.log(`[FACTORY] Created ${quantity} ${category} tickets`);
    return tickets;
  }

  // Get price for a category
  public static getPriceForCategory(category: TicketCategory, basePrice: number): number {
    switch (category) {
      case TicketCategory.VIP:
        return basePrice * 1.5;
      case TicketCategory.EARLY_BIRD:
        return basePrice * 0.8;
      case TicketCategory.GENERAL:
      default:
        return basePrice;
    }
  }
}

// Abstract Factory - For extensibility
export interface TicketFactoryInterface {
  createTicket(data: TicketData): Ticket;
}

export class VIPFactory implements TicketFactoryInterface {
  public createTicket(data: TicketData): Ticket {
    return new VIPTicket(data);
  }
}

export class GeneralFactory implements TicketFactoryInterface {
  public createTicket(data: TicketData): Ticket {
    return new GeneralTicket(data);
  }
}

export class EarlyBirdFactory implements TicketFactoryInterface {
  public createTicket(data: TicketData): Ticket {
    return new EarlyBirdTicket(data);
  }
}
