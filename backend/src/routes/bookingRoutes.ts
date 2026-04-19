import { Router } from 'express';
import {
  createBooking,
  getBooking,
  getMyBookings,
  cancelBooking,
  processPayment,
  refundPayment
} from '../controllers/BookingController';
import { authenticate, authorize, validateRequired } from '../middleware';

const router = Router();

router.get('/my-bookings', authenticate, getMyBookings);

router.post('/',
  authenticate,
  authorize('attendee'),
  validateRequired(['eventId', 'seatIds', 'ticketTypeId', 'totalAmount']),
  createBooking
);

router.get('/:id', authenticate, getBooking);

router.patch('/:id/cancel', authenticate, cancelBooking);

router.post('/:bookingId/payment',
  authenticate,
  validateRequired(['paymentMethod', 'paymentInfo']),
  processPayment
);

router.post('/refund/:transactionId',
  authenticate,
  authorize('admin'),
  refundPayment
);

export default router;
