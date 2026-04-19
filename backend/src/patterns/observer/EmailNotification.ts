import { NotificationObserver, NotificationEvent } from './NotificationObserver';

// Concrete Observer - Email Notification
export class EmailNotification implements NotificationObserver {
  private smtpHost: string;

  constructor(smtpHost: string = 'smtp.example.com') {
    this.smtpHost = smtpHost;
  }

  public update(event: NotificationEvent): void {
    console.log(`[EMAIL] Sending email to ${event.recipient}`);
    console.log(`[EMAIL] Subject: ${event.subject}`);
    console.log(`[EMAIL] Message: ${event.message}`);
    
    // In real app, would send actual email via SMTP
    this.sendEmail(event.recipient, event.subject, event.message);
  }

  private sendEmail(to: string, subject: string, body: string): void {
    // Mock email sending
    console.log(`[EMAIL] Email sent successfully to ${to} via ${this.smtpHost}`);
  }
}
