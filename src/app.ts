import { userRoutes } from '@/modules/users/http/users.routes.js'
import { errorHandlerMiddleware } from '@/shared/errors/error-handler.middleware.shared.js'
import express from 'express'

export const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/v1/health-check', (req, res) => {
  res.status(200).json({
    message: 'Healthy!',
  })
})

app.use('/v1/users', userRoutes)

app.use((req, res) => {
  res.status(404).json({
    error: `Cannot ${req.method} to ${req.originalUrl} - Route not found`,
  })
})
app.use(errorHandlerMiddleware)
