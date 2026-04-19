import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';

// Enums
export enum UserRole {
  ATTENDEE = 'attendee',
  ORGANIZER = 'organizer',
  ADMIN = 'admin'
}

export enum VerificationStatus {
  PENDING = 'pending',
  VERIFIED = 'verified',
  REJECTED = 'rejected'
}

// Interfaces
export interface UserProfile {
  avatarUrl?: string;
  dateOfBirth?: Date;
  gender?: string;
  address?: string;
  city?: string;
  country?: string;
  postalCode?: string;
  bio?: string;
}

export interface UserPreferences {
  emailNotifications: boolean;
  smsNotifications: boolean;
  pushNotifications: boolean;
  language: string;
  currency: string;
}

export interface Booking {
  id: string;
  eventId: string;
  userId: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'refunded';
  totalAmount: number;
  bookingDate: Date;
}

// Abstract Base Class - Demonstrates ABSTRACTION
export abstract class User {
  protected id: string;
  protected email: string;
  protected passwordHash: string;
  protected firstName: string;
  protected lastName: string;
  protected phone?: string;
  protected emailVerified: boolean;
  protected createdAt: Date;
  protected updatedAt: Date;
  protected lastLogin?: Date;
  protected isActive: boolean;
  protected avatarUrl?: string;
  protected dateOfBirth?: Date;
  protected gender?: string;
  protected address?: string;
  protected city?: string;
  protected country?: string;
  protected postalCode?: string;
  protected bio?: string;

  constructor(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phone?: string
  ) {
    this.id = uuidv4();
    this.email = email;
    this.passwordHash = this.hashPassword(password);
    this.firstName = firstName;
    this.lastName = lastName;
    this.phone = phone;
    this.emailVerified = false;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.isActive = true;
  }

  // Abstract method - must be implemented by subclasses - Demonstrates POLYMORPHISM
  abstract getRole(): UserRole;

  // Encapsulation - private method
  private hashPassword(password: string): string {
    const saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
  }

  // Public methods - controlled access
  public verifyPassword(password: string): boolean {
    return bcrypt.compareSync(password, this.passwordHash);
  }

  public validateEmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }

  public updateProfile(data: Partial<UserProfile>): void {
    if (data.avatarUrl) this.avatarUrl = data.avatarUrl;
    if (data.dateOfBirth) this.dateOfBirth = new Date(data.dateOfBirth);
    if (data.gender) this.gender = data.gender;
    if (data.address) this.address = data.address;
    if (data.city) this.city = data.city;
    if (data.country) this.country = data.country;
    if (data.postalCode) this.postalCode = data.postalCode;
    if (data.bio) this.bio = data.bio;
    this.updatedAt = new Date();
  }

  public setEmailVerified(status: boolean): void {
    this.emailVerified = status;
    this.updatedAt = new Date();
  }

  public setLastLogin(): void {
    this.lastLogin = new Date();
  }

  public deactivate(): void {
    this.isActive = false;
    this.updatedAt = new Date();
  }

  public activate(): void {
    this.isActive = true;
    this.updatedAt = new Date();
  }

  // Getters - Encapsulation
  public getId(): string {
    return this.id;
  }

  public getEmail(): string {
    return this.email;
  }

  public getName(): string {
    return `${this.firstName} ${this.lastName}`;
  }

  public getFirstName(): string {
    return this.firstName;
  }

  public getLastName(): string {
    return this.lastName;
  }

  public getPhone(): string | undefined {
    return this.phone;
  }

  public isEmailVerified(): boolean {
    return this.emailVerified;
  }

  public isActiveUser(): boolean {
    return this.isActive;
  }

  public getCreatedAt(): Date {
    return this.createdAt;
  }

  public getUpdatedAt(): Date {
    return this.updatedAt;
  }

  public getLastLogin(): Date | undefined {
    return this.lastLogin;
  }

  // Convert to plain object for API responses
  public toJSON(): any {
    return {
      id: this.id,
      email: this.email,
      firstName: this.firstName,
      lastName: this.lastName,
      name: this.getName(),
      phone: this.phone,
      role: this.getRole(),
      emailVerified: this.emailVerified,
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      lastLogin: this.lastLogin
    };
  }
}
