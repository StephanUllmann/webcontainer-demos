import { Router } from 'express';
import { z } from 'zod';
import { User } from '../models/user.model.ts';
import { AuthService } from '../services/auth.service.ts';
import { validate } from '../middleware/validate.ts';
import { sendResponse, sendError } from '../utils/response.ts';

const router = Router();

const registerSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(6),
  }),
});

const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

router.post('/register', validate(registerSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;
    
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return sendError(res, 400, 'User already exists');
    }

    const user = new User({ email, password });
    await user.save();

    return sendResponse(res, 201, null, 'User registered successfully');
  } catch (error) {
    next(error);
  }
});

router.post('/login', validate(loginSchema), async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await (user as any).comparePassword(password))) {
      return sendError(res, 401, 'Invalid credentials');
    }

    const token = AuthService.generateToken({ userId: user._id.toString() });

    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    return sendResponse(res, 200, { user: { id: user._id, email: user.email } }, 'Login successful');
  } catch (error) {
    next(error);
  }
});

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  return sendResponse(res, 200, null, 'Logged out successfully');
});

export default router;
