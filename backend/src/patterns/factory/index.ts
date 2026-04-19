// Factory Pattern - Ticket Creation
// Centralized ticket creation for different types

export { Ticket, TicketCategory, TicketData } from './Ticket';
export { VIPTicket } from './VIPTicket';
export { GeneralTicket } from './GeneralTicket';
export { EarlyBirdTicket } from './EarlyBirdTicket';
export { TicketFactory, TicketFactoryInterface, VIPFactory, GeneralFactory, EarlyBirdFactory } from './TicketFactory';
