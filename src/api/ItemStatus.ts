import { Router } from 'express'
import ItemStatusServices from '../services/ItemStatusServices'

const routes = Router()

routes.get('/get', ItemStatusServices.getAllItemStatus)
routes.get('/get/:id', ItemStatusServices.getOneItemStatusByID)
routes.post('/add', ItemStatusServices.saveItemStatus)
routes.put('/update', ItemStatusServices.updateItemStatus)

export default routes
