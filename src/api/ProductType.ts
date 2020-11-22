import { Router } from 'express'
import ProductType from '../services/ProductTypeServices'

const routes = Router()

routes.get('/getall', ProductType.getAllProductType)
routes.get('/get/:id', ProductType.getOneProductTypeByID)
routes.get('/getbycategory/:id', ProductType.getAllByCategoryID)
routes.post('/add', ProductType.saveProductType)
routes.post('/update', ProductType.updateProductType)
routes.get('/del/:id', ProductType.deleteProductType)

export default routes
