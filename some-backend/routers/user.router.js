import { Router } from 'express';
import {
  createUser,
  getAllUsers,
  getOneUser,
  updateOneUser,
  deleteUser,
  addBookToReadingList,
  updateBookStatus,
  deleteBookFromReadingList,
} from '../controllers/user.controllers.js';
import { login, logout, registerUser, me } from '../controllers/auth.controllers.js';
import authenticate from '../middlewares/authenticate.js';
import hasRole from '../middlewares/hasRole.js';

const userRouter = Router();

userRouter.post('/', registerUser);
userRouter.post('/login', login);
userRouter.delete('/logout', logout);
userRouter.get('/me', authenticate, me);

userRouter.get('/', getAllUsers);
userRouter.get('/:id', getOneUser);
userRouter.put('/:id', updateOneUser);
userRouter.delete('/:id', deleteUser);

userRouter.post('/:id/books', authenticate, hasRole('admin'), addBookToReadingList);
userRouter.put('/:id/books/:bookId', authenticate, hasRole('self', 'admin'), updateBookStatus);
userRouter.delete('/:id/books/:bookId', authenticate, hasRole('self', 'admin'), deleteBookFromReadingList);

export default userRouter;
