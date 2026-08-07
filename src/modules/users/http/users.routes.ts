import * as controller from '@/modules/users/http/users.controller.js'
import { Router } from 'express'

export const userRoutes = Router()
userRoutes.post('/', controller.postCreateUser)
