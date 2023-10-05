import express from 'express';
import { usersRoutes } from '../modules/Users/users.routes';
import { categoryRoutes } from '../modules/Category/category.routes';
import { authRoutes } from '../modules/Auth/auth.routes';
import { booksRoutes } from '../modules/Book/books.routes';
import { orderRoutes } from '../modules/Order/orders.routes';
import { profileRoutes } from '../modules/Profile/profile.routes';
const router = express.Router();

const moduleRoutes: any[] = [
  {
    path: '/users',
    route: usersRoutes,
  },
  {
    path: '/categories',
    route: categoryRoutes,
  },
  {
    path: '/orders',
    route: orderRoutes,
  },
  {
    path: '/profile',
    route: profileRoutes,
  },
  {
    path: '/categories',
    route: categoryRoutes,
  },
  {
    path: '/auth',
    route: usersRoutes,
  },
  {
    path: '/books',
    route: booksRoutes,
  },
  {
    path: '/auth',
    route: authRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));
export default router;
