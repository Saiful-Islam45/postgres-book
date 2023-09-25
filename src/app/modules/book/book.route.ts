import express from 'express';
import { BookController } from './book.controller';

const router = express.Router();

router.post('/create-book', BookController.createBook);
router.get('/', BookController.getAllBooks);
router.get('/:categoryId/category', BookController.getBooksByCategoryId);

router
  .route('/:id')
  .patch(BookController.updateBook)
  .get(BookController.getBookById)
  .delete(BookController.deleteBook);

export const BookRoutes = router;
