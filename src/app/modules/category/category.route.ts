import express from 'express';
import { CategoryController } from './category.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post('/create-category', auth(ENUM_USER_ROLE.ADMIN), CategoryController.createCategory);
router.get('/', CategoryController.getAllCategories);

router
  .route('/:id')
  .get(CategoryController.findCategoryById)
  .patch(auth(ENUM_USER_ROLE.ADMIN), CategoryController.updateCategory)
  .delete(auth(ENUM_USER_ROLE.ADMIN), CategoryController.deleteCategory);

export const CategoryRoutes = router;
