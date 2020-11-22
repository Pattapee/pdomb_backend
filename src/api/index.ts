import { Router } from 'express'
import ldapservice from '../services/ldapService'
import Product from './Product'
import ProductCategory from './ProductCategory'
import ProductStatus from './ProductStatus'
import ProductType from './ProductType'
const routes = Router()

routes.use('/product', Product)
routes.use('/producttype', ProductType)
routes.use('/productcategory', ProductCategory)
routes.use('/productstatus', ProductStatus)
routes.post('/user/userauthen', ldapservice.userAuthen)
routes.post('/user/searchByFullname', ldapservice.searchByFullname)
routes.post('/user/searchByUserID', ldapservice.searchByUserID)
routes.post('/user/searchByUsername', ldapservice.searchByUsername)

export default routes
