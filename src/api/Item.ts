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
routes.get('/historywd/get', ItemHistoryWithdraw.getAllItemHistoryWithdraw)
routes.get('/historywd/getbyitem/:id', ItemHistoryWithdraw.getAllByIDItem)
routes.post('/historywd/add', ItemHistoryWithdraw.SaveData)
routes.post('/historywd/del', ItemHistoryWithdraw.DelItemHistoryWithdraw)
routes.post('/historywd/update', ItemHistoryWithdraw.updateData)
// itemHistoryDeposit
routes.get('/historydp/get', ItemHistoryDeposit.getAllItemHistoryDeposit)
routes.get('/historydp/getbyitem/:id', ItemHistoryDeposit.getAllByIDItem)
routes.post('/historydp/add', ItemHistoryDeposit.SaveData)
routes.post('/historydp/del', ItemHistoryDeposit.DelItemHistoryDeposit)
routes.post('/historydp/update', ItemHistoryDeposit.updateData)

export default routes
