import { Router, Request, Response, NextFunction } from 'express';
import { z } from 'zod';
import { AuthorService } from '../services/author.service.ts';
import { validate } from '../middleware/validate.ts';
import { authGuard } from '../middleware/auth.middleware.ts';
import { sendResponse, sendError } from '../utils/response.ts';

const router = Router();

const createAuthorSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    bio: z.string().optional(),
    birthDate: z.string().datetime().optional(),
    nationality: z.string().optional(),
  }),
});

const updateAuthorSchema = z.object({
  body: z.object({
    name: z.string().min(1).optional(),
    bio: z.string().optional(),
    birthDate: z.string().datetime().optional(),
    nationality: z.string().optional(),
  }),
});

router.post('/', authGuard as any, validate(createAuthorSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const author = await AuthorService.createAuthor(req.body);
    return sendResponse(res, 201, author, 'Author created successfully');
  } catch (error) {
    next(error);
  }
});

router.get('/', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, nationality, page, limit } = req.query;
    const authors = await AuthorService.getAuthors(
      { name: name as string, nationality: nationality as string },
      { page: Number(page), limit: Number(limit) }
    );
    return sendResponse(res, 200, authors, 'Authors retrieved successfully');
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req: Request, res: Response, next: NextFunction) => {
  try {
    const author = await AuthorService.getAuthorById(req.params.id as string);
    if (!author) {
      return sendError(res, 404, 'Author not found');
    }
    return sendResponse(res, 200, author, 'Author retrieved successfully');
  } catch (error) {
    next(error);
  }
});

router.patch('/:id', authGuard as any, validate(updateAuthorSchema), async (req: Request, res: Response, next: NextFunction) => {
  try {
    const author = await AuthorService.updateAuthor(req.params.id as string, req.body);
    if (!author) {
      return sendError(res, 404, 'Author not found');
    }
    return sendResponse(res, 200, author, 'Author updated successfully');
  } catch (error) {
    next(error);
  }
});

router.delete('/:id', authGuard as any, async (req: Request, res: Response, next: NextFunction) => {
  try {
    const author = await AuthorService.deleteAuthor(req.params.id as string);
    if (!author) {
      return sendError(res, 404, 'Author not found');
    }
    return sendResponse(res, 200, null, 'Author deleted successfully');
  } catch (error) {
    next(error);
  }
});

export default router;
