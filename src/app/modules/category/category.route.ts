import express from 'express';
import { CategoryController } from './category.controller';

const router = express.Router();

router.post('/create-category', CategoryController.createCategory);
router.get('/', CategoryController.getAllCategories);

router
  .route('/:id')
  .get(CategoryController.findCategoryById)
  .patch(CategoryController.updateCategory)
  .delete(CategoryController.deleteCategory);

export const UserRoutes = router;
