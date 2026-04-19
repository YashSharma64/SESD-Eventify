import { User, UserRole } from './User';

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface SystemAnalytics {
  totalUsers: number;
  totalEvents: number;
  totalBookings: number;
  totalRevenue: number;
  activeUsers: number;
}

// Admin class - Demonstrates INHERITANCE
export class Admin extends User {
  private permissions: Permission[];

  constructor(
    email: string,
    password: string,
    firstName: string,
    lastName: string,
    phone?: string,
    permissions?: Permission[]
  ) {
    super(email, password, firstName, lastName, phone);
    
    // Default admin permissions
    this.permissions = permissions || [
      { id: '1', name: 'manage_users', description: 'Can manage all users' },
      { id: '2', name: 'approve_events', description: 'Can approve events' },
      { id: '3', name: 'view_analytics', description: 'Can view system analytics' },
      { id: '4', name: 'ban_users', description: 'Can ban users' }
    ];
  }

  // Implements abstract method - Demonstrates POLYMORPHISM
  public getRole(): UserRole {
    return UserRole.ADMIN;
  }

  // Admin-specific methods
  public manageUsers(): { message: string; timestamp: Date } {
    this.updatedAt = new Date();
    return {
      message: 'User management access granted',
      timestamp: new Date()
    };
  }

  public approveEvents(): { message: string; timestamp: Date } {
    this.updatedAt = new Date();
    return {
      message: 'Event approval access granted',
      timestamp: new Date()
    };
  }

  public viewSystemAnalytics(): SystemAnalytics {
    this.updatedAt = new Date();
    
    // Mock system analytics
    return {
      totalUsers: 150,
      totalEvents: 25,
      totalBookings: 450,
      totalRevenue: 25000,
      activeUsers: 85
    };
  }

  public banUser(userId: string): boolean {
    // Mock implementation - in real app, would update database
    console.log(`User ${userId} has been banned`);
    this.updatedAt = new Date();
    return true;
  }

  public unbanUser(userId: string): boolean {
    console.log(`User ${userId} has been unbanned`);
    this.updatedAt = new Date();
    return true;
  }

  public addPermission(permission: Permission): void {
    this.permissions.push(permission);
    this.updatedAt = new Date();
  }

  public removePermission(permissionId: string): boolean {
    const index = this.permissions.findIndex(p => p.id === permissionId);
    if (index !== -1) {
      this.permissions.splice(index, 1);
      this.updatedAt = new Date();
      return true;
    }
    return false;
  }

  public getPermissions(): Permission[] {
    return this.permissions;
  }

  public hasPermission(permissionName: string): boolean {
    return this.permissions.some(p => p.name === permissionName);
  }

  // Override toJSON to include admin-specific data
  public toJSON(): any {
    return {
      ...super.toJSON(),
      permissions: this.permissions,
      permissionsCount: this.permissions.length
    };
  }
}
