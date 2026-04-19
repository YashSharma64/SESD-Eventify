import express from 'express';
import cors from 'cors';
import routes from './routes';
import { errorHandler, notFound } from './middleware';
import { Logger } from './patterns/singleton/Logger';

const logger = Logger.getInstance();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
  logger.info(`${req.method} ${req.path}`, 'HTTP');
  next();
});

app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'success',
    message: 'Server is running',
    timestamp: new Date()
  });
});

app.get('/', (req, res) => {
  res.json({
    name: 'Eventify API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      events: '/api/events',
      bookings: '/api/bookings'
    }
  });
});

app.use('/api', routes);

app.use(notFound);
app.use(errorHandler);

export default app;