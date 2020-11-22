import { Router } from 'express'
import ProductCategory from '../services/ProductCategoryServices'

const routes = Router()

routes.get('/getall', ProductCategory.getAllProductCategory)
routes.get('/get/:id', ProductCategory.getOneProductCategoryByID)
routes.post('/add', ProductCategory.saveProductCategory)
routes.post('/update', ProductCategory.updateProductCategory)
routes.get('/del/:id', ProductCategory.deleteProductCategory)

export default routes
