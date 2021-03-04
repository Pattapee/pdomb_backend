import { Router } from 'express';
import ItemCategory from '../services/ItemCategoryServices';

const routes = Router();

routes.get('/get', ItemCategory.getAllItemCategory);
routes.get('/get/:id', ItemCategory.getOneItemCategoryByID);
routes.post('/add', ItemCategory.saveItemCategory);
routes.put('/update', ItemCategory.updateItemCategory);
routes.delete('/delete/:id', ItemCategory.deleteItemCategory);

export default routes;
