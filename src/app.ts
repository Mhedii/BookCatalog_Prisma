import cookieParser from 'cookie-parser'
import cors from 'cors'
import { Application, NextFunction, Request, Response } from 'express'
import express from 'express'
import httpStatus from 'http-status'
import routes from './app/routes'
const app: Application = express()
const corsOptions = { origin: true, Credential: true }
app.use('*', cors(corsOptions))
app.use(cookieParser())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use('/api/v1', routes)
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.get('/', async (req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessage: {
      path: req.originalUrl,
      message: 'Not Found',
    },
  })
})

export default app
