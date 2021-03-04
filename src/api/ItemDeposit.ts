import { Router } from 'express'
import ItemDeposit from '../services/ItemDepositService'

const routes = Router()

routes.get('/get', ItemDeposit.getAllItemDeposit)
routes.get('/get/:id', ItemDeposit.getOneByID)
routes.post('/add', ItemDeposit.SaveItemDeposit)
routes.put('/update', ItemDeposit.updateItemDeposit)
routes.post('/delete', ItemDeposit.delItemDeposit)

export default routes
