import express from 'express';
import { usersController } from './users.controller';
const router = express.Router();
router.post('/signup', usersController.createUser);
router.get('/', usersController.getUsers);
router.get('/:id', usersController.getSingleUser);

export const usersRoutes = router;
