import { Router } from 'express'
import ItemHistoryDeposit from '../services/ItemHistoryDepositServices'
import ItemHistoryWithdraw from '../services/ItemHistoryWithdrawServices'
import Item from '../services/ItemServices'

const routes = Router()

routes.get('/get', Item.getAllItem)
routes.get('/withdraw', Item.getItemforwithdraw)
routes.get('/get/:id', Item.getOneItemByID)
routes.post('/add', Item.SaveItem)
routes.put('/update', Item.updateItem)
routes.post('/getbyitemtype', Item.getAllByitemTypes)
routes.post('/delete', Item.DeleteItem)
// itemHistoryWithdraw
routes.get('/history/get', ItemHistoryWithdraw.getAllItemHistoryWithdraw)
routes.get('/history/getbyitem/:id', ItemHistoryWithdraw.getAllByIDItem)
routes.post('/history/add', ItemHistoryWithdraw.SaveData)
routes.post('/history/del', ItemHistoryWithdraw.DelItemHistoryWithdraw)
routes.post('/history/update', ItemHistoryWithdraw.updateData)
// itemHistoryDeposit
routes.get('/historyde/get', ItemHistoryDeposit.getAllItemHistoryDeposit)
routes.get('/historyde/getbyitem/:id', ItemHistoryDeposit.getAllByIDItem)
routes.post('/historyde/add', ItemHistoryDeposit.SaveData)
routes.post('/historyde/del', ItemHistoryDeposit.DelItemHistoryDeposit)
routes.post('/historyde/update', ItemHistoryDeposit.updateData)

export default routes
