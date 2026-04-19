// Singleton Pattern - Config Manager
// Single instance for configuration management

export interface Configuration {
  port: number;
  nodeEnv: string;
  jwtSecret: string;
  jwtExpiresIn: string;
  databaseUrl: string;
  maxSeatLockDuration: number; // in minutes
  defaultCurrency: string;
}

export class ConfigManager {
  private static instance: ConfigManager;
  private config: Configuration;

  // Private constructor prevents direct instantiation
  private constructor() {
    this.config = this.loadConfig();
  }

  // Get singleton instance
  public static getInstance(): ConfigManager {
    if (!ConfigManager.instance) {
      ConfigManager.instance = new ConfigManager();
    }
    return ConfigManager.instance;
  }

  // Load configuration from environment
  private loadConfig(): Configuration {
    return {
      port: parseInt(process.env.PORT || '5000'),
      nodeEnv: process.env.NODE_ENV || 'development',
      jwtSecret: process.env.JWT_SECRET || 'default-secret-change-in-production',
      jwtExpiresIn: process.env.JWT_EXPIRES_IN || '7d',
      databaseUrl: process.env.DATABASE_URL || 'postgresql://localhost:5432/eventify',
      maxSeatLockDuration: parseInt(process.env.MAX_SEAT_LOCK_DURATION || '10'),
      defaultCurrency: process.env.DEFAULT_CURRENCY || 'USD'
    };
  }

  // Get entire config
  public getConfig(): Configuration {
    return this.config;
  }

  // Get specific config value
  public get<K extends keyof Configuration>(key: K): Configuration[K] {
    return this.config[key];
  }

  // Update config (useful for testing)
  public updateConfig(updates: Partial<Configuration>): void {
    this.config = { ...this.config, ...updates };
    console.log('[CONFIG] Configuration updated');
  }

  // Check if in development
  public isDevelopment(): boolean {
    return this.config.nodeEnv === 'development';
  }

  // Check if in production
  public isProduction(): boolean {
    return this.config.nodeEnv === 'production';
  }
}
