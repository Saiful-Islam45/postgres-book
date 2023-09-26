import express from 'express';
import { OrderController } from './order.controller';
import auth from '../../middlewares/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

router.post('/create-order', auth(ENUM_USER_ROLE.CUSTOMER), OrderController.createOrder);
router.get('/', OrderController.getAllOrders);
router.get(
  '/:orderId',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  OrderController.getOrderById
);

export const OrderRoutes = router;
