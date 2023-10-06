import express from 'express';
import { booksController } from './books.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';

const router = express.Router();
router.post('/create-book', booksController.createBook);
router.get('/', booksController.getBooks);
router.get('/:id', booksController.getSingleBook);
router.get('/:categoryId/category', booksController.getBookByCategory);
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), booksController.updateBook);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), booksController.deleteBook);

export const booksRoutes = router;
