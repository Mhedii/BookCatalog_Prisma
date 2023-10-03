import express from 'express'
import { usersController } from './users.controller'
const router = express.Router()
router.post('/signup', usersController.createUser)
export const usersRoutes = router
