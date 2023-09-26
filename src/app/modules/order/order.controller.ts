import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import { jwtHelpers } from '../../../helpers/jwtHelper';
import ApiError from '../../../errors/apiError';
import httpStatus from 'http-status';
import { OrderService } from './order.service';

const createOrder = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const userData = jwtHelpers.verifyToken(token as string, config.jwt.secret as Secret);
  if (!userData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid token');
  }
  const orderInfo = {
    userId: userData.userId as string,
    orderedBooks: req.body.orderedBooks
  };
  // @ts-ignore
  const order = await OrderService.createOrder(orderInfo);
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const orders = await OrderService.getAllOrders();
  return orders;
});

const getOrderByUserId = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const userData = jwtHelpers.verifyToken(token as string, config.jwt.secret as Secret);
  if (!userData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid token');
  }
  const orderInfo = {
    userId: userData.userId as string,
    orderedBooks: req.body.orderedBooks
  };

  const order = await OrderService.getOrderByUserId(userData.userId);
});

const getOrderById = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const orderId = req.params.orderId;
  const userData = jwtHelpers.verifyToken(token as string, config.jwt.secret as Secret);
  if (!userData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid token');
  }
  const order = await OrderService.getOrderById(orderId, userData);
});

export const OrderController = {
  createOrder,
  getAllOrders,
  getOrderByUserId,
  getOrderById
};
