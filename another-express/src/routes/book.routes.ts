import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { BookService } from '../services/book.service.ts';
import { validate } from '../middleware/validate.ts';
import { authGuard } from '../middleware/auth.middleware.ts';
import { sendResponse, sendError } from '../utils/response.ts';

const router = Router();

const createBookSchema = z.object({
  body: z.object({
    title: z.string().min(1),
    isbn: z.string().min(1),
    summary: z.string().optional(),
    author: z.string().length(24), // Mongoose ObjectId length
    publishedDate: z.string().datetime().optional(),
    genres: z.array(z.string()).optional(),
  }),
});

const updateBookSchema = z.object({
  body: z.object({
    title: z.string().min(1).optional(),
    isbn: z.string().min(1).optional(),
    summary: z.string().optional(),
    author: z.string().length(24).optional(),
    publishedDate: z.string().datetime().optional(),
    genres: z.array(z.string()).optional(),
  }),
});

router.post('/', authGuard as any, validate(createBookSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await BookService.createBook(req.body);
    return sendResponse(res, 201, book, 'Book created successfully');
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, author, genre, page, limit } = req.query;
    const books = await BookService.getBooks(
      { title: title as string, author: author as string, genre: genre as string },
      { page: Number(page), limit: Number(limit) }
    );
    return sendResponse(res, 200, books, 'Books retrieved successfully');
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await BookService.getBookById(req.params.id as string);
    if (!book) {
      return sendError(res, 404, 'Book not found');
    }
    return sendResponse(res, 200, book, 'Book retrieved successfully');
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', authGuard as any, validate(updateBookSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await BookService.updateBook(req.params.id as string, req.body);
    if (!book) {
      return sendError(res, 404, 'Book not found');
    }
    return sendResponse(res, 200, book, 'Book updated successfully');
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authGuard as any, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const book = await BookService.deleteBook(req.params.id as string);
    if (!book) {
      return sendError(res, 404, 'Book not found');
    }
    return sendResponse(res, 200, null, 'Book deleted successfully');
  } catch (error) {
    next(error);
  }
});

export default router;
