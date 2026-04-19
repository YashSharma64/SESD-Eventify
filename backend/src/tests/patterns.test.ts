import { CreditCardStrategy } from '../patterns/strategy/CreditCardStrategy';
import { PayPalStrategy } from '../patterns/strategy/PayPalStrategy';
import { PaymentService, createPaymentService } from '../patterns/strategy/PaymentService';
import { NotificationService, createNotificationEvent, EmailNotification, SMSNotification } from '../patterns/observer';
import { SeatContext, AvailableState, LockedState, BookedState } from '../patterns/state';
import { TicketFactory, TicketCategory } from '../patterns/factory';
import { Logger } from '../patterns/singleton/Logger';
import { ConfigManager } from '../patterns/singleton/ConfigManager';

describe('Strategy Pattern - Payment', () => {
  test('CreditCardStrategy should process payment', async () => {
    const strategy = new CreditCardStrategy();
    const result = await strategy.pay(100, {
      cardNumber: '1234567890123456',
      expiryDate: '12/25',
      cvv: '123'
    });
    expect(result.success).toBeDefined();
    expect(result.message).toBeDefined();
  });

  test('PayPalStrategy should process payment', async () => {
    const strategy = new PayPalStrategy();
    const result = await strategy.pay(100, {
      email: 'test@test.com'
    });
    expect(result.success).toBeDefined();
  });

  test('PaymentService should use strategy', async () => {
    const service = createPaymentService('credit_card');
    const result = await service.processPayment(100, {
      cardNumber: '1234567890123456',
      expiryDate: '12/25',
      cvv: '123'
    });
    expect(result).toBeDefined();
  });
});

describe('Observer Pattern - Notifications', () => {
  test('NotificationService should attach observers', () => {
    const service = new NotificationService();
    const emailObserver = new EmailNotification();
    service.attach(emailObserver);
    expect(service.getObserverCount()).toBe(1);
  });

  test('NotificationService should detach observers', () => {
    const service = new NotificationService();
    const emailObserver = new EmailNotification();
    service.attach(emailObserver);
    service.detach(emailObserver);
    expect(service.getObserverCount()).toBe(0);
  });

  test('NotificationService should notify all observers', () => {
    const service = new NotificationService();
    const emailObserver = new EmailNotification();
    const smsObserver = new SMSNotification();
    
    service.attach(emailObserver);
    service.attach(smsObserver);
    
    const event = createNotificationEvent(
      'booking_confirmed',
      'user@test.com',
      'Booking Confirmed',
      'Your booking has been confirmed'
    );
    
    service.notify(event);
    expect(service.getObserverCount()).toBe(2);
  });
});

describe('State Pattern - Seat Management', () => {
  test('SeatContext should start in available state', () => {
    const seat = new SeatContext('seat-1');
    expect(seat.isAvailable()).toBe(true);
    expect(seat.getState().getName()).toBe('available');
  });

  test('SeatContext should transition to locked state', () => {
    const seat = new SeatContext('seat-1');
    seat.lock('user-1');
    expect(seat.isAvailable()).toBe(false);
    expect(seat.getState().getName()).toBe('locked');
  });

  test('SeatContext should transition to booked state', () => {
    const seat = new SeatContext('seat-1');
    seat.lock('user-1');
    seat.book('booking-1');
    expect(seat.getState().getName()).toBe('booked');
  });
});

describe('Factory Pattern - Ticket Creation', () => {
  test('TicketFactory should create VIP ticket', () => {
    const ticket = TicketFactory.createTicket(TicketCategory.VIP, {
      eventId: 'event-1',
      seatId: 'seat-1',
      userId: 'user-1',
      price: 100
    });
    expect(ticket.getType()).toBe('VIP Ticket');
    expect(ticket.price).toBe(150);
  });

  test('TicketFactory should create General ticket', () => {
    const ticket = TicketFactory.createTicket(TicketCategory.GENERAL, {
      eventId: 'event-1',
      seatId: 'seat-1',
      userId: 'user-1',
      price: 100
    });
    expect(ticket.getType()).toBe('General Ticket');
    expect(ticket.price).toBe(100);
  });

  test('TicketFactory should create Early Bird ticket', () => {
    const ticket = TicketFactory.createTicket(TicketCategory.EARLY_BIRD, {
      eventId: 'event-1',
      seatId: 'seat-1',
      userId: 'user-1',
      price: 100
    });
    expect(ticket.getType()).toBe('Early Bird Ticket');
    expect(ticket.price).toBe(80);
  });

  test('TicketFactory should create bulk tickets', () => {
    const tickets = TicketFactory.createBulkTickets(TicketCategory.GENERAL, 5, {
      eventId: 'event-1',
      seatId: 'seat-1',
      userId: 'user-1',
      price: 100
    });
    expect(tickets.length).toBe(5);
  });
});

describe('Singleton Pattern', () => {
  test('Logger should be singleton', () => {
    const logger1 = Logger.getInstance();
    const logger2 = Logger.getInstance();
    expect(logger1).toBe(logger2);
  });

  test('Logger should log messages', () => {
    const logger = Logger.getInstance();
    logger.info('Test message');
    expect(logger.getLogCount()).toBeGreaterThan(0);
  });

  test('ConfigManager should be singleton', () => {
    const config1 = ConfigManager.getInstance();
    const config2 = ConfigManager.getInstance();
    expect(config1).toBe(config2);
  });

  test('ConfigManager should have default config', () => {
    const config = ConfigManager.getInstance();
    expect(config.get('port')).toBeDefined();
    expect(config.get('nodeEnv')).toBeDefined();
  });
});
