import { Router } from 'express';
import ItemType from '../services/ItemTypeServices';

const routes = Router();

routes.get('/get', ItemType.getAllItemType);
routes.get('/get/:id', ItemType.getOneItemTypeByID);
routes.get('/getbycategory/:id', ItemType.getAllByCategoryID);
routes.post('/add', ItemType.saveItemType);
routes.put('/update', ItemType.updateItemType);
routes.delete('/delete/:id', ItemType.deleteItemType);

export default routes;
