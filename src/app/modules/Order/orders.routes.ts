import express from 'express';
import { orderController } from './orders.controller';

const router = express.Router();
router.post('/create-order', orderController.createOrder);
router.get('/', orderController.getOrders);
// router.get('/:id', categoryController.getSingleCategory);
// router.patch('/:id', categoryController.updateCategory);
// router.delete('/:id', categoryController.deleteCategory);

export const orderRoutes = router;
