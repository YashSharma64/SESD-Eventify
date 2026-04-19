import { NotificationObserver, NotificationEvent } from './NotificationObserver';

// Concrete Observer - Push Notification
export class PushNotification implements NotificationObserver {
  private deviceId: string;

  constructor(deviceId?: string) {
    this.deviceId = deviceId || 'default_device';
  }

  public update(event: NotificationEvent): void {
    console.log(`[PUSH] Sending push notification`);
    console.log(`[PUSH] Type: ${event.type}`);
    console.log(`[PUSH] Message: ${event.message}`);
    
    // In real app, would use Firebase Cloud Messaging or similar
    this.sendPush(event.recipient, event.subject, event.message);
  }

  private sendPush(userId: string, title: string, body: string): void {
    // Mock push notification
    console.log(`[PUSH] Push notification sent to user ${userId}`);
  }
}
