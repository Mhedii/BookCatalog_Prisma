import express from 'express';
import { usersController } from './users.controller';
import { ENUM_USER_ROLE } from '../../enums/user';
import auth from '../../middlewares/auth';
const router = express.Router();
router.post('/signup', usersController.createUser);
router.get('/', auth(ENUM_USER_ROLE.ADMIN), usersController.getUsers);
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), usersController.getSingleUser);
router.patch('/:id', auth(ENUM_USER_ROLE.ADMIN), usersController.updateUser);
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), usersController.deleteUser);

export const usersRoutes = router;
