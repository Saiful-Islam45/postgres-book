import { Order, PrismaClient } from '@prisma/client';
import { IWhere } from './order.interface';

const prisma = new PrismaClient();

const createOrder = async (data: Order): Promise<Order> => {
  // @ts-ignore
  const order = await prisma.order.create({ data: data });
  return order;
};

const getAllOrders = async (): Promise<Order[]> => {
  const orders = await prisma.order.findMany();
  return orders;
};

const getOrderByUserId = async (userId: string): Promise<Order[]> => {
  const order = await prisma.order.findMany({
    where: {
      userId
    }
  });
  return order;
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
  getOrderByUserId,
  getOrderById
};
