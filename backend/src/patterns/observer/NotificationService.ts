import { NotificationObserver, NotificationEvent } from './NotificationObserver';

// Subject class that manages observers
export class NotificationService {
  private observers: NotificationObserver[] = [];

  // Attach an observer
  public attach(observer: NotificationObserver): void {
    const isExist = this.observers.includes(observer);
    if (isExist) {
      console.log('Observer already attached');
      return;
    }
    this.observers.push(observer);
    console.log('Observer attached successfully');
  }

  // Detach an observer
  public detach(observer: NotificationObserver): void {
    const observerIndex = this.observers.indexOf(observer);
    if (observerIndex === -1) {
      console.log('Observer not found');
      return;
    }
    this.observers.splice(observerIndex, 1);
    console.log('Observer detached successfully');
  }

  // Notify all observers
  public notify(event: NotificationEvent): void {
    console.log(`\n=== Notifying ${this.observers.length} observers ===`);
    
    for (const observer of this.observers) {
      observer.update(event);
    }
    
    console.log('=== All observers notified ===\n');
  }

  // Get observer count
  public getObserverCount(): number {
    return this.observers.length;
  }

  // Clear all observers
  public clearObservers(): void {
    this.observers = [];
    console.log('All observers cleared');
  }
}

// Helper function to create notification event
export function createNotificationEvent(
  type: NotificationEvent['type'],
  recipient: string,
  subject: string,
  message: string
): NotificationEvent {
  return {
    type,
    recipient,
    subject,
    message,
    timestamp: new Date()
  };
}
