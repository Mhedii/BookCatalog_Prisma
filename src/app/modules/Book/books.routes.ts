import express from 'express';
import { booksController } from './books.controller';

const router = express.Router();
router.post('/create-book', booksController.createBook);
router.get('/', booksController.getBooks);
router.get('/:id', booksController.getSingleBook);
router.get('/:categoryId/category', booksController.getBookByCategory);
router.patch('/:id', booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

export const booksRoutes = router;
