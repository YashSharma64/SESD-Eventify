# Eventify - Smart Event & Venue Booking Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18%2B-green.svg)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-blue.svg)](https://www.typescriptlang.org/)

> **A full-stack event booking system demonstrating OOP principles, design patterns, and clean architecture for SESD Project.**

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

**Eventify** is an event booking platform designed to demonstrate software engineering best practices, OOP principles, and clean architecture patterns. The system implements a complete backend with proper layering, design patterns, and database design.

### Project Focus

This project emphasizes:
- **Backend Architecture (75%)**: Clean code structure with controllers/services/repositories
- **OOP Principles**: Inheritance, encapsulation, abstraction, and polymorphism
- **Design Patterns**: Strategy, Factory, Singleton, Observer, and State patterns
- **Database Design**: Proper normalization, indexing, and relationships

### Problem Statement

Event organizers struggle with managing venue bookings, seat availability, and payments efficiently. Eventify provides a unified platform that handles event creation, seat management, and booking workflows.

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

Eventify follows **Clean Architecture** with clear separation of concerns:

```
Backend (Node.js/Express)
    |
    |-- Controllers/     (Request Handling)
    |-- Services/        (Business Logic)
    |-- Repositories/    (Data Access)
    |-- Models/          (Domain Entities)
    |-- Middlewares/     (Auth, Validation, Logging)
    |-- Utils/           (Helpers, Validators)
    |-- Config/          (Environment, Database)
```

### Architectural Principles

1. **Layered Architecture**: Controllers → Services → Repositories → Database
2. **Dependency Injection**: Loose coupling between components
3. **Repository Pattern**: Abstracts data access layer
4. **DTO Pattern**: Clean API contracts
5. **Middleware Pipeline**: Authentication, validation, logging

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
|   |   |-- controllers/    # Request handlers
|   |   |-- services/       # Business logic
|   |   |-- repositories/   # Data access
|   |   |-- models/         # Domain entities
|   |   |-- middlewares/    # Auth, validation
|   |   |-- routes/        # API routes
|   |   |-- factories/      # Factory pattern
|   |   |-- strategies/     # Strategy pattern
|   |   |-- observers/      # Observer pattern
|   |   |-- states/         # State pattern
|   |   |-- singleton/      # Singleton pattern
|   |   |-- utils/          # Helper functions
|   |   |-- config/         # Configuration
|   |   |-- types/          # TypeScript types
|   |-- tests/              # Test files
|   |-- package.json
|
|-- frontend/
|   |-- src/
|   |   |-- components/     # React components
|   |   |-- pages/          # Page components
|   |   |-- services/       # API calls
|   |-- package.json
|
|-- idea.md                 # Project idea
|-- useCaseDiagram.md       # Use case diagram
|-- sequenceDiagram.md      # Sequence diagram
|-- classDiagram.md         # Class diagram
|-- ErDiagram.md            # ER diagram
|-- README.md               # This file
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
# Configure database in .env
npm run dev

# Frontend setup (in new terminal)
cd ../frontend
npm install
npm start
```

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
cd backend
npm test                 # Run all tests
npm run test:coverage    # Coverage report
```

---

## Author

**Yash Sharma**  
GitHub: [@YashSharma64](https://github.com/YashSharma64)

---

**SESD Project - Software Engineering & System Design**