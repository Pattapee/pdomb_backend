import { Router } from 'express'
import ItemWithdraw from '../services/ItemWithdrawServices'

const routes = Router()

routes.get('/get', ItemWithdraw.getAllItemWithdraw)
routes.get('/get/:id', ItemWithdraw.getOneItemWithdraw)
routes.post('/add', ItemWithdraw.saveitemWithdraw)
routes.put('/update', ItemWithdraw.updateItemWithdraw)
routes.post('/delete', ItemWithdraw.delItemWithdraw)

export default routes
