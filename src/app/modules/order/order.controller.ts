import { Request, Response } from 'express';
import catchAsync from '../../../shared/catchAsync';
import config from '../../../config';
import { Secret } from 'jsonwebtoken';
import { jwtHelpers } from '../../../helpers/jwtHelper';
import ApiError from '../../../errors/apiError';
import httpStatus from 'http-status';
import { OrderService } from './order.service';
import sendResponse from '../../../shared/response';
import { Order } from '@prisma/client';

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
  sendResponse<Order>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully',
    data: order
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const userData = jwtHelpers.verifyToken(token as string, config.jwt.secret as Secret);
  if (!userData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid token');
  }
  const orders = await OrderService.getAllOrders(userData);
  sendResponse<Order[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrieved successfully',
    data: orders
  });
});

const getOrderById = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  const orderId = req.params.orderId;
  const userData = jwtHelpers.verifyToken(token as string, config.jwt.secret as Secret);
  if (!userData) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Invalid token');
  }
  const order = await OrderService.getOrderById(orderId, userData);
  sendResponse<Order | null>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Border fetched successfully',
    data: order
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
  getOrderById
};
