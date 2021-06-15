import { Router } from 'express'
import ItemDepositDetail from '../services/ItemDepositDetailService'

const routes = Router()

routes.get('/get', ItemDepositDetail.getAllItemDepositDetaiul)
routes.get('/get/:id', ItemDepositDetail.getOneItemDepositDetail)
routes.post('/add', ItemDepositDetail.saveitemDepositDetail)
routes.post('/update', ItemDepositDetail.updateitemDepositDetail)
routes.post('/getbyitemdeposit', ItemDepositDetail.getAllByItemDeposit)
routes.post('/delete', ItemDepositDetail.delItemDepositDetail)

export default routes
