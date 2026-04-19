import { NotificationObserver, NotificationEvent } from './NotificationObserver';

// Concrete Observer - SMS Notification
export class SMSNotification implements NotificationObserver {
  private apiKey: string;

  constructor(apiKey: string = 'sms_api_key_123') {
    this.apiKey = apiKey;
  }

  public update(event: NotificationEvent): void {
    console.log(`[SMS] Sending SMS notification`);
    console.log(`[SMS] To: ${event.recipient}`);
    console.log(`[SMS] Message: ${event.message}`);
    
    // In real app, would call SMS gateway API
    this.sendSMS(event.recipient, event.message);
  }

  private sendSMS(phoneNumber: string, message: string): void {
    // Mock SMS sending
    console.log(`[SMS] SMS sent successfully to ${phoneNumber}`);
  }
}
