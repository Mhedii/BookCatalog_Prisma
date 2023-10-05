import express from 'express';
import { orderController } from './orders.controller';

const router = express.Router();
router.post('/create-order', orderController.createOrder);
router.get('/', orderController.getOrders);
router.get('/:orderId', orderController.getOrderById);

export const orderRoutes = router;
