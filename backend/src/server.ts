import dotenv from 'dotenv';
import app from './app';
import { Logger } from './patterns/singleton/Logger';
import { ConfigManager } from './patterns/singleton/ConfigManager';

dotenv.config();

const logger = Logger.getInstance();
const config = ConfigManager.getInstance();

const PORT = config.get('port');

const server = app.listen(PORT, () => {
  logger.info(`Server running on port ${PORT}`, 'Server');
  logger.info(`Environment: ${config.get('nodeEnv')}`, 'Server');
  logger.info(`Health check: http://localhost:${PORT}/health`, 'Server');
});

process.on('unhandledRejection', (err: Error) => {
  logger.error(`Unhandled rejection: ${err.message}`, 'Server');
  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', () => {
  logger.info('SIGTERM received. Shutting down gracefully', 'Server');
  server.close(() => {
    logger.info('Process terminated', 'Server');
    process.exit(0);
  });
});