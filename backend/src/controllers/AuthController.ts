import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/AuthService';
import { UserRole } from '../models/User';
import { catchAsync } from '../middleware';

const authService = new AuthService();

export const register = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { email, password, firstName, lastName, role, phone } = req.body;

  const { user, token } = await authService.register(
    email,
    password,
    firstName,
    lastName,
    role as UserRole,
    phone
  );

  res.status(201).json({
    status: 'success',
    data: { user, token }
  });
});

export const login = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  const { user, token } = await authService.login(email, password);

  res.status(200).json({
    status: 'success',
    data: { user, token }
  });
});

export const getMe = catchAsync(async (req: Request, res: Response): Promise<void> => {
  const userId = (req as any).userId;
  const user = await authService.getUserById(userId);

  res.status(200).json({
    status: 'success',
    data: { user }
  });
});
