# Sequence Diagram — Eventify

## Overview

This sequence diagram illustrates the main end-to-end flow for booking a ticket in the Eventify platform, showing the interaction between the User, Frontend Controller, Backend Services, and external systems.

---

## Main Flow: Book Ticket (Success Path)

```mermaid
sequenceDiagram
    participant User
    participant Frontend as Frontend Controller
    participant Auth as Auth Service
    participant Event as Event Service
    participant Seat as Seat Manager
    participant Booking as Booking Service
    participant Payment as Payment Service
    participant Notification as Notification Service
    participant DB as Database
    participant Gateway as Payment Gateway

    User->>Frontend: 1. Select Event & Seats
    Frontend->>Auth: 2. Validate JWT Token
    Auth-->>Frontend: 3. Token Valid
    Frontend->>Event: 4. Get Event Details
    Event->>DB: 5. Fetch Event Info
    DB-->>Event: 6. Event Data
    Event-->>Frontend: 7. Event Details
    
    Frontend->>Seat: 8. Check Seat Availability
    Seat->>DB: 9. Query Seat Status
    DB-->>Seat: 10. Available Seats
    Seat-->>Frontend: 11. Seat Availability
    
    User->>Frontend: 12. Confirm Booking
    Frontend->>Seat: 13. Lock Selected Seats
    Seat->>DB: 14. Update Seat Status (LOCKED)
    DB-->>Seat: 15. Lock Confirmed
    Seat-->>Frontend: 16. Seats Locked
    
    Frontend->>Booking: 17. Create Booking Request
    Booking->>DB: 18. Create Booking Record
    DB-->>Booking: 19. Booking ID Generated
    Booking-->>Frontend: 20. Booking Created
    
    Frontend->>Payment: 21. Initiate Payment
    Payment->>Gateway: 22. Process Payment
    Gateway-->>Payment: 23. Payment Success
    Payment->>DB: 24. Update Payment Status
    DB-->>Payment: 25. Payment Recorded
    
    Payment-->>Frontend: 26. Payment Confirmed
    Payment->>Booking: 27. Update Booking Status
    Booking->>DB: 28. Confirm Booking
    DB-->>Booking: 29. Booking Confirmed
    
    Booking->>Seat: 30. Confirm Seat Allocation
    Seat->>DB: 31. Update Seat Status (BOOKED)
    DB-->>Seat: 32. Seats Booked
    Seat-->>Booking: 33. Seat Allocation Confirmed
    
    Booking->>Notification: 34. Trigger Confirmation
    Notification->>User: 35. Send Email Confirmation
    Notification->>User: 36. Send SMS Confirmation
    Notification->>Frontend: 37. Push Notification
    
    Frontend-->>User: 38. Booking Confirmation Page
```

---

## Alternative Flow: Payment Failure

```mermaid
sequenceDiagram
    participant User
    participant Frontend as Frontend Controller
    participant Seat as Seat Manager
    participant Booking as Booking Service
    participant Payment as Payment Service
    participant Notification as Notification Service
    participant DB as Database
    participant Gateway as Payment Gateway

    Note over User, Gateway: Previous steps 1-20 completed (seats locked, booking created)
    
    Frontend->>Payment: 21. Initiate Payment
    Payment->>Gateway: 22. Process Payment
    Gateway-->>Payment: 23. Payment Failed
    Payment->>DB: 24. Record Failed Payment
    DB-->>Payment: 25. Failure Recorded
    
    Payment-->>Frontend: 26. Payment Failed
    Payment->>Booking: 27. Cancel Booking
    Booking->>DB: 28. Update Booking Status (CANCELLED)
    DB-->>Booking: 29. Booking Cancelled
    
    Booking->>Seat: 30. Release Seat Locks
    Seat->>DB: 31. Update Seat Status (AVAILABLE)
    DB-->>Seat: 32. Seats Released
    Seat-->>Booking: 33. Locks Released
    
    Booking->>Notification: 34. Notify Failure
    Notification->>User: 35. Send Payment Failure Email
    Notification->>Frontend: 36. Push Notification
    
    Frontend-->>User: 37. Payment Failed - Retry Option
```

---

## Alternative Flow: Seat Lock Timeout

```mermaid
sequenceDiagram
    participant User
    participant Frontend as Frontend Controller
    participant Seat as Seat Manager
    participant Booking as Booking Service
    participant Notification as Notification Service
    participant DB as Database

    Note over User, DB: User has selected seats but didn't complete payment within timeout
    
    Seat->>Seat: 1. Check Lock Timeout (10 minutes elapsed)
    Seat->>DB: 2. Find Expired Locks
    DB-->>Seat: 3. Expired Locks Found
    
    Seat->>DB: 4. Update Seat Status (AVAILABLE)
    DB-->>Seat: 5. Seats Released
    
    Seat->>Booking: 6. Cancel Pending Bookings
    Booking->>DB: 7. Update Booking Status (EXPIRED)
    DB-->>Booking: 8. Bookings Cancelled
    
    Seat->>Notification: 9. Notify Lock Expiry
    Notification->>User: 10. Send Lock Expired Email
    
    Note over User: User returns to complete booking
    User->>Frontend: 11. Attempt to Complete Booking
    Frontend->>Seat: 12. Check Seat Availability
    Seat-->>Frontend: 13. Seats No Longer Available
    Frontend-->>User: 14. Show Seat Unavailable Message
```

---

## Event Creation Flow

```mermaid
sequenceDiagram
    participant Organizer
    participant Frontend as Frontend Controller
    participant Auth as Auth Service
    participant Event as Event Service
    participant Venue as Venue Service
    participant Admin as Admin Service
    participant Notification as Notification Service
    participant DB as Database

    Organizer->>Frontend: 1. Create New Event
    Frontend->>Auth: 2. Validate Organizer Role
    Auth-->>Frontend: 3. Role Validated
    
    Organizer->>Frontend: 4. Fill Event Details
    Frontend->>Event: 5. Create Event Request
    Event->>Venue: 6. Validate Venue Availability
    Venue->>DB: 7. Check Venue Schedule
    DB-->>Venue: 8. Venue Available
    Venue-->>Event: 9. Venue Confirmed
    
    Event->>DB: 10. Create Event Record
    DB-->>Event: 11. Event ID Generated
    Event-->>Frontend: 12. Event Created (DRAFT)
    
    Organizer->>Frontend: 13. Configure Seating
    Frontend->>Venue: 14. Setup Venue Layout
    Venue->>DB: 15. Create Seat Records
    DB-->>Venue: 16. Seats Created
    Venue-->>Frontend: 17. Layout Configured
    
    Organizer->>Frontend: 18. Set Ticket Pricing
    Frontend->>Event: 19. Update Ticket Types
    Event->>DB: 20. Save Pricing Configuration
    DB-->>Event: 21. Pricing Saved
    
    Organizer->>Frontend: 22. Submit for Approval
    Frontend->>Admin: 23. Event Approval Request
    Admin->>DB: 24. Update Event Status (PENDING)
    DB-->>Admin: 25. Status Updated
    
    Admin->>Notification: 26. Notify Admin Review
    Notification->>Admin: 27. New Event Approval Email
    
    Admin->>Admin: 28. Review Event
    Admin->>Event: 29. Approve Event
    Event->>DB: 30. Update Event Status (APPROVED)
    DB-->>Event: 31. Event Approved
    
    Event->>Notification: 32. Notify Organizer
    Notification->>Organizer: 33. Event Approved Email
    Notification->>Frontend: 34. Push Notification
```

---

## User Registration Flow

```mermaid
sequenceDiagram
    participant User
    participant Frontend as Frontend Controller
    participant Auth as Auth Service
    participant DB as Database
    participant Email as Email Service

    User->>Frontend: 1. Register New Account
    Frontend->>Auth: 2. Validate Registration Data
    Auth->>DB: 3. Check Email Exists
    DB-->>Auth: 4. Email Available
    
    Auth->>Auth: 5. Hash Password
    Auth->>DB: 6. Create User Record
    DB-->>Auth: 7. User ID Generated
    
    Auth->>Email: 8. Send Verification Email
    Email-->>User: 9. Verification Email Sent
    
    Auth-->>Frontend: 10. Registration Success
    Frontend-->>User: 11. Please Verify Email
    
    User->>Email: 12. Click Verification Link
    Email->>Auth: 13. Verify Email Token
    Auth->>DB: 14. Update Email Status (VERIFIED)
    DB-->>Auth: 15. Status Updated
    
    Auth->>Auth: 16. Generate JWT Tokens
    Auth-->>Email: 17. Welcome Email
    Email-->>User: 18. Welcome Message
    
    Note over User: User logs in for first time
    User->>Frontend: 19. Login with Credentials
    Frontend->>Auth: 20. Authenticate User
    Auth->>DB: 21. Validate Credentials
    DB-->>Auth: 22. User Validated
    
    Auth-->>Frontend: 23. JWT Tokens
    Frontend-->>User: 24. Login Successful
```

---

## Key Design Patterns Demonstrated

### 1. **Mediator Pattern**
- The **Booking Service** acts as a mediator between Seat Manager, Payment Service, and Notification Service
- Coordinates complex booking workflow without tight coupling between services

### 2. **State Pattern**
- **Seat Status** transitions: AVAILABLE → LOCKED → BOOKED (or AVAILABLE on timeout)
- **Booking Status** transitions: PENDING → CONFIRMED → CANCELLED/EXPIRED

### 3. **Observer Pattern**
- **Notification Service** observes booking events and notifies multiple channels
- Payment status changes trigger notifications to multiple stakeholders

### 4. **Strategy Pattern**
- **Payment Service** uses different payment strategies (Credit Card, PayPal, etc.)
- Different notification strategies (Email, SMS, Push)

### 5. **Command Pattern**
- Booking actions (Create, Cancel, Confirm) are encapsulated as commands
- Enables undo/redo functionality and audit logging

---

## Error Handling and Resilience

### Timeout Mechanisms
- Seat locks automatically expire after 10 minutes
- Payment transactions timeout after 5 minutes
- Database connection pooling with retry logic

### Compensation Transactions
- Payment failure triggers automatic seat lock release
- Booking cancellation updates all related entities
- Failed email notifications are queued for retry

### Data Consistency
- Database transactions ensure atomicity across multiple tables
- Event sourcing for audit trail and recovery
- Optimistic locking prevents concurrent booking conflicts