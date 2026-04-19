import { Request, Response } from 'express';
import { BookingService } from '../services/BookingService';
import { PaymentMethod } from '../models/Payment';
import { catchAsync } from '../middleware';

const bookingService = new BookingService();

export const createBooking = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).userId;
  const { eventId, seatIds, ticketTypeId, totalAmount } = req.body;

  const booking = await bookingService.createBooking(
    userId,
    eventId,
    seatIds,
    ticketTypeId,
    totalAmount
  );

  res.status(201).json({
    status: 'success',
    data: { booking: booking.toJSON() }
  });
});

export const getBooking = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const booking = await bookingService.getBookingById(id);

  if (!booking) {
    res.status(404).json({
      status: 'fail',
      message: 'Booking not found'
    });
    return;
  }

  res.status(200).json({
    status: 'success',
    data: { booking: booking.toJSON() }
  });
});

export const getMyBookings = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).userId;
  const bookings = await bookingService.getBookingsByUser(userId);

  res.status(200).json({
    status: 'success',
    results: bookings.length,
    data: { bookings: bookings.map(b => b.toJSON()) }
  });
});

export const cancelBooking = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;
  const booking = await bookingService.cancelBooking(id);

  if (!booking) {
    res.status(404).json({
      status: 'fail',
      message: 'Booking not found'
    });
    return;
  }

  res.status(200).json({
    status: 'success',
    data: { booking: booking.toJSON() }
  });
});

export const processPayment = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { bookingId } = req.params;
  const { paymentMethod, paymentInfo } = req.body;

  const booking = await bookingService.getBookingById(bookingId);
  
  if (!booking) {
    res.status(404).json({
      status: 'fail',
      message: 'Booking not found'
    });
    return;
  }

  const payment = await bookingService.processPayment(
    bookingId,
    booking.getTotalAmount(),
    paymentMethod as PaymentMethod,
    paymentInfo
  );

  res.status(200).json({
    status: 'success',
    data: { payment: payment.toJSON() }
  });
});

export const refundPayment = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { transactionId } = req.params;

  const success = await bookingService.refundPayment(transactionId);

  res.status(200).json({
    status: 'success',
    data: { refunded: success }
  });
});
