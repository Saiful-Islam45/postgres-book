import express from 'express';
import { UserRoutes, profileRoute } from '../modules/user/user.route';
import { CategoryRoutes } from '../modules/category/category.route';
import { BookRoutes } from '../modules/book/book.route';
import { OrderRoutes } from '../modules/order/order.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    routes: UserRoutes
  },
  {
    path: '/categories',
    routes: CategoryRoutes
  },
  {
    path: '/books',
    routes: BookRoutes
  },
  {
    path: '/orders',
    routes: OrderRoutes
  },
  {
    path: '/profile',
    routes: profileRoute
  }
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.routes);
});

export default router;
