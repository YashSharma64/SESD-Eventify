import jwt from 'jsonwebtoken';
import { Attendee } from '../models/Attendee';
import { Organizer } from '../models/Organizer';
import { Admin } from '../models/Admin';
import { UserRole } from '../models/User';
import { Logger } from '../patterns/singleton/Logger';

const logger = Logger.getInstance();

export interface UserStore {
  [key: string]: any;
}

export class AuthService {
  private users: UserStore = {};
  private secret: string = process.env.JWT_SECRET || 'default-secret';

  async register(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    role: UserRole,
    phone?: string
  ): Promise<{ user: any; token: string }> {
    if (this.users[email]) {
      throw new Error('User already exists');
    }

    let user;
    switch (role) {
      case UserRole.ATTENDEE:
        user = new Attendee(email, password, firstName, lastName, phone);
        break;
      case UserRole.ORGANIZER:
        user = new Organizer(email, password, firstName, lastName, phone);
        break;
      case UserRole.ADMIN:
        user = new Admin(email, password, firstName, lastName, phone);
        break;
      default:
        throw new Error('Invalid role');
    }

    this.users[email] = user;
    logger.info(`User registered: ${email}`, 'AuthService');

    const token = this.generateToken(user);

    return { user: user.toJSON(), token };
  }

  async login(email: string, password: string): Promise<{ user: any; token: string }> {
    const user = this.users[email];

    if (!user) {
      throw new Error('User not found');
    }

    if (!user.verifyPassword(password)) {
      throw new Error('Invalid password');
    }

    user.setLastLogin();
    logger.info(`User logged in: ${email}`, 'AuthService');

    const token = this.generateToken(user);

    return { user: user.toJSON(), token };
  }

  async getUserById(userId: string): Promise<any | null> {
    const user = Object.values(this.users).find((u: any) => u.getId() === userId);
    return user ? user.toJSON() : null;
  }

  async getUserByEmail(email: string): Promise<any | null> {
    const user = this.users[email];
    return user ? user.toJSON() : null;
  }

  private generateToken(user: any): string {
    const payload = {
      userId: user.getId(),
      email: user.getEmail(),
      role: user.getRole()
    };

    return jwt.sign(payload, this.secret, { expiresIn: '7d' });
  }
}
