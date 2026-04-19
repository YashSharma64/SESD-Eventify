<div align="center">

# 🎟️ Eventify
### Event Booking System

**A full-stack event booking platform built as a SESD college project.**  
Demonstrates OOP principles, design patterns, and clean software architecture through a real, working application.

[![Node.js](https://img.shields.io/badge/Node.js-18%2B-339933?style=flat-square&logo=node.js&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0%2B-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)](https://react.dev/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15%2B-316192?style=flat-square&logo=postgresql&logoColor=white)](https://postgresql.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

</div>

---

## 📖 What is Eventify?

Eventify is a **mini event ticketing system** — think BookMyShow, but built from scratch for a Software Engineering course.

A user lands on the app, browses upcoming events, selects seats from an interactive seat map, picks a ticket type (VIP / General / Early Bird), chooses a payment method, and gets their booking confirmed — all in two clean pages.

**The real purpose:** showcase that every layer of the system is engineered properly — backend patterns, OOP models, database design, and a professional frontend that makes it all visible.

---

## ✨ Features

| Feature | Details |
|---|---|
| 🔐 **Auth** | JWT-based login with role-based access |
| 🎪 **Events** | Browse, create, publish, and cancel events |
| 💺 **Seat Map** | Interactive grid — Available (green), Locked (yellow), Booked (red) |
| 🎫 **Tickets** | Multi-tier pricing — VIP, General, Early Bird |
| 💳 **Payments** | Strategy Pattern — Credit Card, PayPal, Bank Transfer |
| 🔔 **Notifications** | Observer Pattern — Email, SMS, Push |
| 📋 **My Bookings** | View complete booking history with live statuses |

> **🎓 Note on UI Scope:** The backend and database are fully architected and secured for all three roles (`Attendee`, `Organizer`, `Admin`). However, the frontend demo strictly focuses on the **Attendee** flow. This was a deliberate choice to visually demonstrate the most complex transaction pipelines (seat state management, factory pattern tickets, and strategy pattern payments) for presentation purposes.

---

## 🛠️ Tech Stack

### Backend — Node.js + Express
| Technology | Role |
|---|---|
| Node.js + Express | REST API server |
| TypeScript | Type-safe code |
| PostgreSQL | Relational database (18 tables) |
| JWT + bcrypt | Authentication & password hashing |
| Jest | Unit testing |

### Frontend — React + Tailwind
| Technology | Role |
|---|---|
| React 19 + Vite | Fast, modern UI |
| Tailwind CSS | Dark-themed styling |
| Axios | API client with JWT interceptors |
| React Router | Two-page routing |
| Lucide React | Clean iconography |

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│            Frontend (React)             │
│  EventExplorer  →  BookingDashboard     │
└────────────────┬────────────────────────┘
                 │ HTTP (Axios)
┌────────────────▼────────────────────────┐
│           Backend (Express)             │
│  Routes → Middleware → Controllers      │
│              ↓                          │
│           Services                      │
│              ↓                          │
│      Models + Design Patterns           │
└────────────────┬────────────────────────┘
                 │
┌────────────────▼────────────────────────┐
│          PostgreSQL Database            │
└─────────────────────────────────────────┘
```

---

## 🧩 Design Patterns

### 1. Strategy Pattern — Payments
Swap payment methods without changing business logic.
```typescript
interface PaymentStrategy {
  pay(amount: number, info: PaymentInfo): Promise<PaymentResult>;
}

class CreditCardStrategy implements PaymentStrategy { ... }
class PayPalStrategy       implements PaymentStrategy { ... }
class BankTransferStrategy implements PaymentStrategy { ... }
```

### 2. State Pattern — Seat Management
Seats transition through defined states.
```typescript
interface SeatState {
  lock(seat: Seat): boolean;
  book(seat: Seat): boolean;
}

class AvailableState implements SeatState { ... }  // 🟢 Green
class LockedState    implements SeatState { ... }  // 🟡 Yellow
class BookedState    implements SeatState { ... }  // 🔴 Red
```

### 3. Observer Pattern — Notifications
Notify multiple channels on booking events.
```typescript
class NotificationService {
  notify(event: NotificationEvent): void {
    this.observers.forEach(obs => obs.update(event));
  }
}
// Observers: EmailNotification, SMSNotification, PushNotification
```

### 4. Factory Pattern — Ticket Creation
```typescript
class TicketFactory {
  static createTicket(type: TicketCategory): Ticket {
    if (type === 'VIP')        return new VIPTicket();
    if (type === 'EARLY_BIRD') return new EarlyBirdTicket();
    return new GeneralTicket();
  }
}
```

### 5. Singleton Pattern — Logger
```typescript
class Logger {
  private static instance: Logger;
  static getInstance(): Logger {
    if (!Logger.instance) Logger.instance = new Logger();
    return Logger.instance;
  }
}
```

---

## 🔷 OOP Principles

### Inheritance — User Hierarchy
```typescript
abstract class User {
  protected id: string;
  protected email: string;
  abstract getRole(): string;
}

class Attendee  extends User { getRole() { return 'attendee'; } }
class Organizer extends User { getRole() { return 'organizer'; } }
class Admin     extends User { getRole() { return 'admin'; } }
```

### Encapsulation — Seat Model
```typescript
class Seat {
  private status: SeatStatus;
  private state: SeatState;

  public lock(userId: string): boolean {
    return this.state.lock(this, userId); // Controlled access
  }
}
```

### Abstraction & Polymorphism — Notification Channels
```typescript
interface NotificationObserver {
  update(event: NotificationEvent): void;
}

class EmailNotification implements NotificationObserver { ... }
class SMSNotification   implements NotificationObserver { ... }
```

---

## 🌍 Deployment

The application is fully configured for production deployment using modern cloud platforms:

- **Frontend:** [Vercel](https://vercel.com) (React + Vite)
- **Backend:** [Render](https://render.com) (Node.js + Express)
- **Database:** [Supabase](https://supabase.com) (PostgreSQL)

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL 15+
- npm

### Setup

```bash
# 1. Clone the repo
git clone https://github.com/YashSharma64/SESD-Eventify.git
cd SESD-Eventify

# 2. Setup Backend
cd backend
npm install
cp .env.example .env       # Fill in your DB credentials
npm run db:init             # Initialize database tables
npm run dev                 # Starts on http://localhost:3000

# 3. Setup Frontend (new terminal)
cd ../frontend
npm install
npm run dev                 # Starts on http://localhost:5173
```

> The frontend auto-authenticates using a test user on first load — no manual login needed for demo purposes.

---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/auth/register` | Public |
| POST | `/api/auth/login` | Public |
| GET | `/api/auth/me` | Authenticated |

### Events
| Method | Endpoint | Access |
|---|---|---|
| GET | `/api/events` | Public |
| GET | `/api/events/:id` | Public |
| POST | `/api/events` | Organizer / Admin |
| PATCH | `/api/events/:id/publish` | Organizer / Admin |
| GET | `/api/events/venues/:venueId/seats` | Public |

### Bookings
| Method | Endpoint | Access |
|---|---|---|
| POST | `/api/bookings` | Attendee |
| GET | `/api/bookings/my-bookings` | Authenticated |
| GET | `/api/bookings/:id` | Authenticated |
| PATCH | `/api/bookings/:id/cancel` | Authenticated |
| POST | `/api/bookings/:bookingId/payment` | Authenticated |

---

## 🗃️ Database Design

PostgreSQL schema with **18 tables** including proper normalization, foreign keys, indexes, and constraints.

See → [ErDiagram.md](./ErDiagram.md)

---

## 🧪 Testing

```bash
# Run backend unit tests
cd backend && npm test
```

---

## 📁 Project Documents

| Document | Description |
|---|---|
| [idea.md](./idea.md) | Project concept and scope |
| [classDiagram.md](./classDiagram.md) | Full class diagram |
| [sequenceDiagram.md](./sequenceDiagram.md) | Booking flow sequence |
| [useCaseDiagram.md](./useCaseDiagram.md) | Use cases by role |
| [ErDiagram.md](./ErDiagram.md) | Database ER diagram |

---

## 👤 Author

**Yash Sharma** — [@YashSharma64](https://github.com/YashSharma64)

---

<div align="center">
  <sub>SESD Project — Software Engineering & System Design</sub>
</div>