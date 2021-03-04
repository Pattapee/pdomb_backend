import { Router } from 'express'
import ItemWithdrawDetail from '../services/ItemWithdrawDetailServices'

const routes = Router()

routes.get('/get', ItemWithdrawDetail.getAllItemWithdrawDetail)
routes.get('/get/:id', ItemWithdrawDetail.getOneItemWithdrawDetail)
routes.post('/add', ItemWithdrawDetail.saveitemWithdrawDetail)
routes.put('/update', ItemWithdrawDetail.updateItemWithdrawDetail)
routes.post('/getbyitemwithdraw', ItemWithdrawDetail.getAllByitemwithdraw)

export default routes
