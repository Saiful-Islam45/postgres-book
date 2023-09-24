import express from 'express';
import { UserRoutes } from '../modules/user/user.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/auth',
    routes: UserRoutes
  }
];

moduleRoutes.forEach((route) => {
  router.use(route.path);
});

export default router;
