import express from 'express';
import { profileController } from './profile.controller';
import { ENUM_USER_ROLE } from '../../enums/user';
import auth from '../../middlewares/auth';

const router = express.Router();

router.get(
  '/',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.CUSTOMER),
  profileController.getProfile,
);

export const profileRoutes = router;
