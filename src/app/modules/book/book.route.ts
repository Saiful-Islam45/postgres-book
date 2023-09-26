import express from 'express';
import { BookController } from './book.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post('/create-book', auth(ENUM_USER_ROLE.ADMIN), BookController.createBook);
router.get('/', BookController.getAllBooks);
router.get('/:categoryId/category', BookController.getBooksByCategoryId);

router
  .route('/:id')
  .patch(auth(ENUM_USER_ROLE.ADMIN), BookController.updateBook)
  .get(BookController.getBookById)
  .delete(auth(ENUM_USER_ROLE.ADMIN), BookController.deleteBook);

export const BookRoutes = router;
