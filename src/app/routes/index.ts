import express from 'express'
const router = express.Router()

const moduleRoutes: any[] = [
  {
    path: '/',
    route: doctorRoutes,
  },
]

moduleRoutes.forEach(route => router.use(route.path, route.route))
export default router