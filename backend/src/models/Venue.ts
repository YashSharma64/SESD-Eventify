import { v4 as uuidv4 } from 'uuid';

export class Venue {
  private id: string;
  private name: string;
  private address: string;
  private city: string;
  private country: string;
  private totalCapacity: number;
  private createdAt: Date;

  constructor(
    name: string,
    address: string,
    city: string,
    country: string,
    totalCapacity: number
  ) {
    this.id = uuidv4();
    this.name = name;
    this.address = address;
    this.city = city;
    this.country = country;
    this.totalCapacity = totalCapacity;
    this.createdAt = new Date();
  }

  // Simple getters
  public getId(): string { return this.id; }
  public getName(): string { return this.name; }
  public getAddress(): string { return this.address; }
  public getCity(): string { return this.city; }
  public getCapacity(): number { return this.totalCapacity; }

  // Convert to JSON
  public toJSON(): any {
    return {
      id: this.id,
      name: this.name,
      address: this.address,
      city: this.city,
      country: this.country,
      totalCapacity: this.totalCapacity,
      createdAt: this.createdAt
    };
  }
}
