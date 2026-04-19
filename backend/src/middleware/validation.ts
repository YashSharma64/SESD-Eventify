import { Request, Response, NextFunction } from 'express';
import { Logger } from '../patterns/singleton/Logger';

const logger = Logger.getInstance();

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  return password.length >= 6;
};

export const validateRequired = (fields: string[]) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    const missingFields = fields.filter(field => !req.body[field]);
    
    if (missingFields.length > 0) {
      logger.warn(`Missing required fields: ${missingFields.join(', ')}`);
      res.status(400).json({
        error: 'Missing required fields',
        missing: missingFields
      });
      return;
    }
    
    next();
  };
};

export const validateEventDates = (req: Request, res: Response, next: NextFunction): void => {
  const { startTime, endTime } = req.body;
  
  if (startTime && endTime) {
    const start = new Date(startTime);
    const end = new Date(endTime);
    
    if (start >= end) {
      res.status(400).json({ error: 'End time must be after start time' });
      return;
    }
    
    if (start < new Date()) {
      res.status(400).json({ error: 'Start time cannot be in the past' });
      return;
    }
  }
  
  next();
};

export const validatePrice = (req: Request, res: Response, next: NextFunction): void => {
  const { basePrice } = req.body;
  
  if (basePrice !== undefined && basePrice < 0) {
    res.status(400).json({ error: 'Price cannot be negative' });
    return;
  }
  
  next();
};

export const sanitizeInput = (req: Request, res: Response, next: NextFunction): void => {
  if (req.body.email) {
    req.body.email = req.body.email.toLowerCase().trim();
  }
  
  if (req.body.firstName) {
    req.body.firstName = req.body.firstName.trim();
  }
  
  if (req.body.lastName) {
    req.body.lastName = req.body.lastName.trim();
  }
  
  next();
};
