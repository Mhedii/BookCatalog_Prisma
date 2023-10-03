import express from 'express';
import { usersRoutes } from '../modules/Users/users.routes';
const router = express.Router();

const moduleRoutes: any[] = [
  {
    path: '/users',
    route: usersRoutes,
  },
  {
    path: '/auth',
    route: usersRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
