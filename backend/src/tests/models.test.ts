import { Attendee } from '../models/Attendee';
import { Organizer } from '../models/Organizer';
import { Admin } from '../models/Admin';
import { UserRole } from '../models/User';
import { Event, EventStatus, EventCategory } from '../models/Event';
import { Seat, SeatStatus, SeatType } from '../models/Seat';
import { Booking, BookingStatus } from '../models/Booking';

describe('User Model - OOP Inheritance', () => {
  test('Attendee should have correct role', () => {
    const attendee = new Attendee('test@test.com', 'password123', 'John', 'Doe');
    expect(attendee.getRole()).toBe(UserRole.ATTENDEE);
    expect(attendee.getEmail()).toBe('test@test.com');
    expect(attendee.getName()).toBe('John Doe');
  });

  test('Organizer should have correct role', () => {
    const organizer = new Organizer('org@test.com', 'password123', 'Jane', 'Smith');
    expect(organizer.getRole()).toBe(UserRole.ORGANIZER);
  });

  test('Admin should have correct role', () => {
    const admin = new Admin('admin@test.com', 'password123', 'Admin', 'User');
    expect(admin.getRole()).toBe(UserRole.ADMIN);
  });

  test('Password verification should work', () => {
    const attendee = new Attendee('test@test.com', 'password123', 'John', 'Doe');
    expect(attendee.verifyPassword('password123')).toBe(true);
    expect(attendee.verifyPassword('wrongpassword')).toBe(false);
  });
});

describe('Event Model', () => {
  test('Event should be created with draft status', () => {
    const event = new Event(
      'org-1',
      'venue-1',
      'Test Event',
      'Description',
      EventCategory.CONCERT,
      new Date('2024-12-01'),
      new Date('2024-12-02'),
      100,
      500
    );
    expect(event.getStatus()).toBe(EventStatus.DRAFT);
    expect(event.getTitle()).toBe('Test Event');
  });

  test('Event status should change when published', () => {
    const event = new Event(
      'org-1',
      'venue-1',
      'Test Event',
      'Description',
      EventCategory.CONCERT,
      new Date('2024-12-01'),
      new Date('2024-12-02'),
      100,
      500
    );
    event.publish();
    expect(event.getStatus()).toBe(EventStatus.PUBLISHED);
  });
});

describe('Seat Model', () => {
  test('Seat should be available by default', () => {
    const seat = new Seat('venue-1', '1', 'A', 'Section A', SeatType.GENERAL);
    expect(seat.isAvailable()).toBe(true);
    expect(seat.getStatus()).toBe(SeatStatus.AVAILABLE);
  });

  test('Seat should lock successfully', () => {
    const seat = new Seat('venue-1', '1', 'A', 'Section A', SeatType.GENERAL);
    const result = seat.lock('user-1');
    expect(result).toBe(true);
    expect(seat.getStatus()).toBe(SeatStatus.LOCKED);
  });

  test('Seat should book after locking', () => {
    const seat = new Seat('venue-1', '1', 'A', 'Section A', SeatType.GENERAL);
    seat.lock('user-1');
    const result = seat.book();
    expect(result).toBe(true);
    expect(seat.getStatus()).toBe(SeatStatus.BOOKED);
  });
});

describe('Booking Model', () => {
  test('Booking should be created with pending status', () => {
    const booking = new Booking('user-1', 'event-1', ['seat-1'], 'ticket-1', 100);
    expect(booking.getStatus()).toBe(BookingStatus.PENDING);
    expect(booking.getTotalAmount()).toBe(100);
  });

  test('Booking should confirm', () => {
    const booking = new Booking('user-1', 'event-1', ['seat-1'], 'ticket-1', 100);
    booking.confirm();
    expect(booking.getStatus()).toBe(BookingStatus.CONFIRMED);
  });
});
