import Router from 'express'
import * as controller from '@/modules/holds/http/holds.controller.js'

export const holdsRoutes = Router()
holdsRoutes.post('/', controller.postCreateHold)
holdsRoutes.get('/', controller.getListHolds)
holdsRoutes.delete('/:id', controller.deleteHoldById)
