import { Pool, PoolClient } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  user: string;
  password: string;
  max: number;
  idleTimeoutMillis: number;
  connectionTimeoutMillis: number;
}

class DatabaseConnection {
  private static instance: DatabaseConnection;
  private pool: Pool;

  private constructor() {
    const config: import('pg').PoolConfig = process.env.DATABASE_URL
      ? {
          connectionString: process.env.DATABASE_URL,
          max: 20,
          idleTimeoutMillis: 30000,
          connectionTimeoutMillis: 2000,
          ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined, // Useful for Supabase
        }
      : {
          host: process.env.DB_HOST || 'localhost',
          port: parseInt(process.env.DB_PORT || '5432'),
          database: process.env.DB_NAME || 'eventify',
          user: process.env.DB_USER || 'postgres',
          password: process.env.DB_PASSWORD || 'password',
          max: 20,
          idleTimeoutMillis: 30000,
          connectionTimeoutMillis: 2000,
        };

    this.pool = new Pool(config);

    this.pool.on('error', (err: Error) => {
      console.error('Unexpected error on idle client', err);
      process.exit(-1);
    });
  }

  public static getInstance(): DatabaseConnection {
    if (!DatabaseConnection.instance) {
      DatabaseConnection.instance = new DatabaseConnection();
    }
    return DatabaseConnection.instance;
  }

  public async query(text: string, params?: any[]): Promise<any> {
    const start = Date.now();
    const result = await this.pool.query(text, params);
    const duration = Date.now() - start;
    console.log('Executed query', { text: text.substring(0, 50), duration, rows: result.rowCount });
    return result;
  }

  public async getClient(): Promise<PoolClient> {
    const client = await this.pool.connect();
    return client;
  }

  public async close(): Promise<void> {
    await this.pool.end();
  }
}

export const db = DatabaseConnection.getInstance();
export { DatabaseConnection };
