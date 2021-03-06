import { Router } from 'express'
import Product from '../services/ProductServices'

const routes = Router()

routes.get('/getall', Product.getAllProduct)
routes.post('/getallbytype/:id', Product.getAllByproductTypes)
routes.get('/get/:id', Product.getOneProductByID)
routes.post('/add', Product.SaveProduct)
routes.post('/update', Product.updateProduct)
routes.delete('/del/:id', Product.deleteProduct)
routes.post('/get/productlist', Product.getProductList)
routes.post('/getCountByCategoryandstatus', Product.getCountByCategoryandstatus)
routes.get('/dashboard', Product.getCountProductDashboard)

export default routes
