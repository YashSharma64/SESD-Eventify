// Observer Pattern - Notification System
// Multiple observers react to events

export interface NotificationEvent {
  type: 'booking_confirmed' | 'booking_cancelled' | 'payment_success' | 'event_reminder';
  recipient: string;
  subject: string;
  message: string;
  timestamp: Date;
}

// Observer Interface
export interface NotificationObserver {
  update(event: NotificationEvent): void;
}
