// Factory Pattern - Ticket Creation
// Centralized ticket creation for different types

export enum TicketCategory {
  VIP = 'vip',
  GENERAL = 'general',
  EARLY_BIRD = 'early_bird'
}

export interface TicketData {
  eventId: string;
  seatId: string;
  userId: string;
  price: number;
}

export interface Ticket {
  id: string;
  eventId: string;
  seatId: string;
  userId: string;
  price: number;
  category: TicketCategory;
  createdAt: Date;
  getType(): string;
  getBenefits(): string[];
}
