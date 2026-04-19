import { Router } from 'express';
import { register, login, getMe } from '../controllers/AuthController';
import { authenticate, validateRequired, sanitizeInput } from '../middleware';

const router = Router();

router.post('/register', 
  sanitizeInput,
  validateRequired(['email', 'password', 'firstName', 'lastName', 'role']),
  register
);

router.post('/login',
  sanitizeInput,
  validateRequired(['email', 'password']),
  login
);

router.get('/me', authenticate, getMe);

export default router;
