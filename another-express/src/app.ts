import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import authRoutes from './routes/auth.routes.ts';
import authorRoutes from './routes/author.routes.ts';
import bookRoutes from './routes/book.routes.ts';
import { errorHandler } from './middleware/error.ts';

const app = express();

// Middleware
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CLIENT_URL || '*',
    credentials: true,
  })
);

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/authors', authorRoutes);
app.use('/api/v1/books', bookRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Book Management API' });
});

// Error handling
app.use(errorHandler);

export default app;
