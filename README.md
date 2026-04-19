# Eventify - Event Booking System (SESD Project)

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue.svg)](https://www.typescriptlang.org/)

> **A prototype event booking system demonstrating OOP principles, design patterns, and clean architecture.**

---

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Design Patterns](#design-patterns)
- [OOP Principles](#oop-principles)
- [Database Schema](#database-schema)
- [Documentation](#documentation)

---

## Overview

**Eventify** is a prototype event booking system built to demonstrate software engineering concepts for the SESD course. The focus is on clean backend code, OOP principles, and design patterns.

### What This Project Demonstrates

- **Backend Architecture (75%)**: Clean layered structure with controllers/services/models
- **OOP Principles**: Inheritance, encapsulation, abstraction, and polymorphism
- **Design Patterns**: Strategy, Factory, Singleton, Observer, and State patterns
- **Database Design**: Proper normalization and relationships

### Problem Statement

Event organizers need a system to manage venue bookings, seat availability, and payments. This prototype shows how to structure such a system using best practices.

---

## Features

### User Management
- Multi-role authentication (Attendee, Organizer, Admin)
- JWT-based authentication with role-based access control
- User profile management

### Event Management
- Event creation and scheduling
- Venue configuration with seating arrangements
- Multi-tier ticket pricing (VIP, General, Early-bird)

### Seat Management
- Seat locking mechanism (prevents double booking)
- Real-time seat availability tracking
- Seat status management (Available, Locked, Booked)

### Booking System
- Create and manage bookings
- Payment processing (simulated)
- Booking cancellation with refund handling

### Notification System
- Multi-channel notifications (Email, SMS, Push)
- Real-time booking confirmations

---

## Architecture

Simple layered architecture:

```
Controllers → Services → Models → Database
     ↓
  Routes → Middleware (Auth)
     ↓
  Design Patterns (in /patterns folder)
```

### Key Principles

1. **Layered Architecture**: Controllers → Services → Models → Database
2. **Separation of Concerns**: Each layer has single responsibility
3. **Design Patterns**: Applied where they naturally fit
4. **Clean Code**: Readable, maintainable, well-documented

---

## Technology Stack

### Backend (75% Focus)

| Technology | Purpose |
|------------|---------|
| **Node.js + Express** | Backend framework |
| **TypeScript** | Type-safe JavaScript |
| **PostgreSQL** | Relational database |
| **JWT** | Authentication |
| **bcrypt** | Password hashing |
| **Jest** | Testing framework |

### Frontend (25% Focus)

| Technology | Purpose |
|------------|---------|
| **React.js** | UI library |
| **Axios** | HTTP client |

### Development Tools

- **ESLint + Prettier**: Code formatting
- **Git**: Version control

---

## Project Structure

```
SESD-Eventify/
|
|-- backend/
|   |-- src/
|   |   |-- controllers/       # Request handlers
|   |   |-- services/          # Business logic
|   |   |-- models/            # Domain entities (User, Event, Booking, etc.)
|   |   |-- patterns/          # Design patterns implementations
|   |   |   |-- strategy/      # Payment strategies
|   |   |   |-- factory/       # Ticket factory
|   |   |   |-- observer/      # Notification observers
|   |   |   |-- state/         # Seat states
|   |   |   |-- singleton/     # Logger singleton
|   |   |-- routes/            # API routes
|   |   |-- middleware/        # Auth middleware
|   |   |-- config/           # Database config
|   |   |-- app.ts             # Express app setup
|   |   |-- server.ts          # Entry point
|   |-- package.json
|   |-- tsconfig.json
|   |-- .env.example
|
|-- frontend/
|   |-- src/
|   |   |-- components/     # React components
|   |   |-- pages/          # Page components
|   |   |-- services/       # API calls
|   |-- package.json
|
|-- idea.md                # Project idea
|-- useCaseDiagram.md      # Use case diagram
|-- sequenceDiagram.md     # Sequence diagram
|-- classDiagram.md        # Class diagram
|-- ErDiagram.md           # ER diagram
|-- README.md              # This file
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 15+
- npm or yarn

### Installation

```bash
# Clone repository
git clone https://github.com/YashSharma64/SESD-Eventify.git
cd SESD-Eventify

# Backend setup
cd backend
npm install
cp .env.example .env
# Edit .env with your database credentials
npm run dev

# Frontend setup (in new terminal)
cd ../frontend
npm install
npm start
```

- Backend: http://localhost:5000
- Frontend: http://localhost:3000

---

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Events
- `GET /api/events` - List all events
- `GET /api/events/:id` - Get event details
- `POST /api/events` - Create event (Organizer)
- `PUT /api/events/:id` - Update event (Organizer)
- `DELETE /api/events/:id` - Delete event (Organizer)

### Bookings
- `POST /api/bookings` - Create booking
- `GET /api/bookings/:id` - Get booking details
- `POST /api/bookings/:id/cancel` - Cancel booking
- `POST /api/bookings/:id/payment` - Process payment

### Admin
- `GET /api/admin/users` - List all users (Admin)
- `PUT /api/admin/events/:id/approve` - Approve event (Admin)

---

## Design Patterns Implemented

Design patterns are applied where they naturally fit the problem:

### 1. Strategy Pattern - Payment Processing
Different payment methods are interchangeable:
```typescript
interface PaymentStrategy {
  pay(amount: number, info: PaymentInfo): Promise<PaymentResult>;
}

class CreditCardStrategy implements PaymentStrategy { ... }
class PayPalStrategy implements PaymentStrategy { ... }
```

### 2. Factory Pattern - Ticket Creation
```typescript
class TicketFactory {
  static createTicket(type: TicketCategory): Ticket {
    if (type === 'VIP') return new VIPTicket();
    return new GeneralTicket();
  }
}
```

### 3. Singleton Pattern - Logger
```typescript
class Logger {
  private static instance: Logger;
  static getInstance(): Logger { ... }
}
```

### 4. Observer Pattern - Notifications
```typescript
class NotificationService {
  notify(event: NotificationEvent): void {
    this.observers.forEach(obs => obs.update(event));
  }
}
```

### 5. State Pattern - Seat Management
```typescript
interface SeatState {
  lock(seat: Seat): boolean;
  book(seat: Seat): boolean;
}

class AvailableState implements SeatState { ... }
class LockedState implements SeatState { ... }
class BookedState implements SeatState { ... }
```

---

## OOP Principles Demonstrated

### 1. Inheritance
User hierarchy with specialized roles:
```typescript
abstract class User {
  protected id: string;
  protected email: string;
  abstract getRole(): string;
}

class Attendee extends User {
  getRole(): string { return 'ATTENDEE'; }
}

class Organizer extends User {
  getRole(): string { return 'ORGANIZER'; }
}
```

### 2. Encapsulation
Private fields with controlled access:
```typescript
class Seat {
  private status: SeatStatus;
  private state: SeatState;
  
  public lock(userId: string): boolean {
    return this.state.lock(this, userId);
  }
}
```

### 3. Abstraction
Interfaces hide implementation complexity:
```typescript
interface PaymentStrategy {
  pay(amount: number, info: PaymentInfo): Promise<PaymentResult>;
}
```

### 4. Polymorphism
Different implementations of same interface:
```typescript
class EmailNotification implements NotificationObserver {
  update(event: NotificationEvent): void {
    this.sendEmail(event.recipient, event.body);
  }
}
```

---

## Database Design

Proper normalization with:
- **18 Tables**: users, events, venues, seats, bookings, payments, etc.
- **Foreign Keys**: Proper relationships between tables
- **Indexes**: Optimized for frequent queries
- **Constraints**: Data integrity enforcement

See [ErDiagram.md](./ErDiagram.md) for complete schema.

---

## Documentation

### Required Documents
- **[idea.md](./idea.md)** - Project idea and scope
- **[useCaseDiagram.md](./useCaseDiagram.md)** - Use case diagram
- **[sequenceDiagram.md](./sequenceDiagram.md)** - Sequence diagrams
- **[classDiagram.md](./classDiagram.md)** - Class diagram
- **[ErDiagram.md](./ErDiagram.md)** - ER diagram

---

## Testing

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

---

## Author

**Yash Sharma**  
GitHub: [@YashSharma64](https://github.com/YashSharma64)

---

**SESD Project - Software Engineering & System Design**