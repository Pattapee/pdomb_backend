import { Router } from 'express'
import ProductStatus from '../services/ProductStatusServices'

const routes = Router()

routes.get('/getall', ProductStatus.getAllProductStatus)
routes.get('/get/:id', ProductStatus.getOneProductStatusByID)
routes.post('/add', ProductStatus.saveProductStatus)
routes.post('/update', ProductStatus.updateProductStatus)
routes.get('/del/:id', ProductStatus.deleteProductStatus)

export default routes
