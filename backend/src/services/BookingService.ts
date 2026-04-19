import { Booking, BookingStatus } from '../models/Booking';
import { Payment, PaymentMethod } from '../models/Payment';
import { Seat } from '../models/Seat';
import { Logger } from '../patterns/singleton/Logger';
import { NotificationService, createNotificationEvent } from '../patterns/observer';
import { createPaymentService } from '../patterns/strategy';

const logger = Logger.getInstance();

export class BookingService {
  private bookings: Booking[] = [];
  private payments: Payment[] = [];
  private notificationService: NotificationService;

  constructor() {
    this.notificationService = new NotificationService();
  }

  async createBooking(
    userId: string,
    eventId: string,
    seatIds: string[],
    ticketTypeId: string,
    totalAmount: number
  ): Promise<Booking> {
    const booking = new Booking(userId, eventId, seatIds, ticketTypeId, totalAmount);
    this.bookings.push(booking);
    
    logger.info(`Booking created: ${booking.getId()}`, 'BookingService');
    
    return booking;
  }

  async getBookingById(bookingId: string): Promise<Booking | null> {
    return this.bookings.find(b => b.getId() === bookingId) || null;
  }

  async getBookingsByUser(userId: string): Promise<Booking[]> {
    return this.bookings.filter(b => b.getUserId() === userId);
  }

  async getBookingsByEvent(eventId: string): Promise<Booking[]> {
    return this.bookings.filter(b => b.getEventId() === eventId);
  }

  async confirmBooking(bookingId: string): Promise<Booking | null> {
    const booking = await this.getBookingById(bookingId);
    if (booking) {
      booking.confirm();
      logger.info(`Booking confirmed: ${bookingId}`, 'BookingService');
    }
    return booking;
  }

  async cancelBooking(bookingId: string): Promise<Booking | null> {
    const booking = await this.getBookingById(bookingId);
    if (booking) {
      booking.cancel();
      logger.info(`Booking cancelled: ${bookingId}`, 'BookingService');
    }
    return booking;
  }

  async processPayment(
    bookingId: string,
    amount: number,
    paymentMethod: PaymentMethod,
    paymentInfo: any
  ): Promise<Payment> {
    const payment = new Payment(bookingId, amount, paymentMethod);
    this.payments.push(payment);

    const paymentService = createPaymentService(paymentMethod);
    const result = await paymentService.processPayment(amount, paymentInfo);

    if (result.success) {
      payment.complete();
      await this.confirmBooking(bookingId);
      logger.info(`Payment successful: ${result.transactionId}`, 'BookingService');
    } else {
      payment.fail();
      logger.error(`Payment failed: ${result.message}`, 'BookingService');
      throw new Error(result.message);
    }

    return payment;
  }

  async refundPayment(transactionId: string): Promise<boolean> {
    const payment = this.payments.find(p => p.getTransactionId() === transactionId);
    
    if (!payment) {
      throw new Error('Payment not found');
    }

    const paymentService = createPaymentService(payment.getMethod() as PaymentMethod);
    const result = await paymentService.processRefund(transactionId);

    if (result.success) {
      payment.refund();
      const booking = await this.getBookingById(payment.getBookingId());
      if (booking) {
        booking.refund();
      }
      logger.info(`Refund processed: ${transactionId}`, 'BookingService');
    }

    return result.success;
  }

  async getPaymentByBooking(bookingId: string): Promise<Payment | null> {
    return this.payments.find(p => p.getBookingId() === bookingId) || null;
  }
}
