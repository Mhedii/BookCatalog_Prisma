import express from 'express';
import { profileController } from './profile.controller';

const router = express.Router();

router.get('/', profileController.getProfile);

export const profileRoutes = router;
