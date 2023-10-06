import express from 'express';
import { categoryController } from './category.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../enums/user';

const router = express.Router();
router.post('/create-category', categoryController.createCategory);
router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getSingleCategory);
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  categoryController.updateCategory,
);
router.delete(
  '/:id',
  auth(ENUM_USER_ROLE.ADMIN),
  categoryController.deleteCategory,
);

export const categoryRoutes = router;
