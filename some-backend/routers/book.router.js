import { Router } from 'express';
import { getAllBooks } from '../controllers/book.controllers.js';
import {
  createOne,
  deleteOne,
  getOne,
  updateOne,
} from '../controllers/crud.js';
import authenticate from '../middlewares/authenticate.js';
import hasRole from '../middlewares/hasRole.js';
import Book from '../models/Book.js';

const bookRouter = Router();

bookRouter.post('/', createOne(Book));
bookRouter.get('/', getAllBooks);
bookRouter.get('/:id', getOne(Book));
bookRouter.put('/:id', updateOne(Book));
bookRouter.delete('/:id', deleteOne(Book));

export default bookRouter;
