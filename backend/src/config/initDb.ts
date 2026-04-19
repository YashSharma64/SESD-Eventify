import fs from 'fs';
import path from 'path';
import { db } from './database';

async function initializeDatabase(): Promise<void> {
  try {
    console.log('Initializing database...');
    
    const schemaPath = path.join(__dirname, 'schema.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    
    await db.query(schema);
    
    console.log('Database schema created successfully!');
    console.log('Tables created: users, user_profiles, venues, events, seats, ticket_types, bookings, booking_seats, payments, notifications');
    
    process.exit(0);
  } catch (error) {
    console.error('Error initializing database:', error);
    process.exit(1);
  }
}

initializeDatabase();
