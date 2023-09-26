import { Order, PrismaClient } from '@prisma/client';
import { IWhere } from './order.interface';
import { ITokenData } from '../../../interfaces/common';

const prisma = new PrismaClient();

const createOrder = async (data: Order): Promise<Order> => {
  // @ts-ignore
  const order = await prisma.order.create({ data: data });
  return order;
};

const getAllOrders = async (userData: ITokenData): Promise<Order[]> => {
  let where = {};
  if (userData.role === 'customer') {
    where = { userId: userData.userId };
  }
  const orders = await prisma.order.findMany({where});
  return orders;
};

const getOrderById = async (id: string, userData: any): Promise<Order | null> => {
  let where: IWhere = {
    id
  };
  if (userData.role === 'customer') {
    where = {
      ...where,
      userId: userData.userId
    };
  }
  const order = await prisma.order.findUnique({
    where
  });
  return order;
};
export const OrderService = {
  createOrder,
  getAllOrders,
  getOrderById
};
