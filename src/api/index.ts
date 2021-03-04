import { Router } from 'express'
import ldapservice from '../services/ldapService'
import Item from './Item'
import ItemCategory from './ItemCategory'
import ItemDeposit from './ItemDeposit'
import ItemDepositDetail from './ItemDepositDetail'
import ItemStatus from './ItemStatus'
import ItemType from './ItemType'
import ItemWithdraw from './ItemWithdraw'
import ItemWithdrawDetail from './ItemWithdrawDetail'
import Product from './Product'
import ProductCategory from './ProductCategory'
import ProductStatus from './ProductStatus'
import ProductType from './ProductType'
const routes = Router()

routes.use('/product', Product)
routes.use('/producttype', ProductType)
routes.use('/productcategory', ProductCategory)
routes.use('/productstatus', ProductStatus)
routes.use('/item', Item)
routes.use('/itemcategory', ItemCategory)
routes.use('/itemstatus', ItemStatus)
routes.use('/itemtype', ItemType)
routes.use('/itemwithdraw', ItemWithdraw)
routes.use('/itemwithdrawdetail', ItemWithdrawDetail)
routes.use('/itemdeposit', ItemDeposit)
routes.use('/itemdepositdetail', ItemDepositDetail)
routes.post('/user/authen', ldapservice.userAuthen)
routes.post('/user/decoaduser', ldapservice.decoadUser)
routes.post('/user/searchByFullname', ldapservice.searchByFullname)
routes.post('/user/searchByUserID', ldapservice.searchByUserID)
routes.post('/user/searchByUsername', ldapservice.searchByUsername)
routes.post('/user/searchByFullnameExit', ldapservice.searchByFullnameExit)

export default routes
