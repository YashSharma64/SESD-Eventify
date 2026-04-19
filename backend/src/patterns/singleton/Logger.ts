// Singleton Pattern - Logger
// Single instance for logging throughout the application

export enum LogLevel {
  INFO = 'INFO',
  WARN = 'WARN',
  ERROR = 'ERROR',
  DEBUG = 'DEBUG'
}

export interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: Date;
  context?: string;
}

export class Logger {
  private static instance: Logger;
  private logs: LogEntry[] = [];
  private maxLogs: number = 1000;

  // Private constructor prevents direct instantiation
  private constructor() {}

  // Get singleton instance
  public static getInstance(): Logger {
    if (!Logger.instance) {
      Logger.instance = new Logger();
    }
    return Logger.instance;
  }

  // Log methods
  public info(message: string, context?: string): void {
    this.log(LogLevel.INFO, message, context);
  }

  public warn(message: string, context?: string): void {
    this.log(LogLevel.WARN, message, context);
  }

  public error(message: string, context?: string): void {
    this.log(LogLevel.ERROR, message, context);
  }

  public debug(message: string, context?: string): void {
    this.log(LogLevel.DEBUG, message, context);
  }

  // Core log method
  private log(level: LogLevel, message: string, context?: string): void {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date(),
      context
    };

    this.logs.push(entry);

    // Keep only last maxLogs entries
    if (this.logs.length > this.maxLogs) {
      this.logs.shift();
    }

    // Console output
    const contextStr = context ? `[${context}]` : '';
    console.log(`[${level}] ${contextStr} ${message}`);
  }

  // Get all logs
  public getLogs(): LogEntry[] {
    return this.logs;
  }

  // Get logs by level
  public getLogsByLevel(level: LogLevel): LogEntry[] {
    return this.logs.filter(log => log.level === level);
  }

  // Clear logs
  public clearLogs(): void {
    this.logs = [];
    console.log('[LOGGER] Logs cleared');
  }

  // Get log count
  public getLogCount(): number {
    return this.logs.length;
  }
}
