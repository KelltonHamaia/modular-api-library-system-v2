import { Router } from 'express'
import * as controller from '@/modules/loans/http/loans.controller.js'
export const loansRoutes = Router()

loansRoutes.post('/', controller.postCreateLoan)
loansRoutes.patch('/:id/return', controller.patchReturnLoan)
