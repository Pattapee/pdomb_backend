import { EntityRepository, Repository } from 'typeorm'
import ItemCategory from '../entities/ItemCategory'

@EntityRepository(ItemCategory)
export class ItemCategoryRepository extends Repository<ItemCategory> {

  // fn Save ItemCategory
  public async Save(itemcategory: ItemCategory): Promise<ItemCategory> {
    await this.save(itemcategory)
    return itemcategory
  }

  // fn getAll ItemCategory
  public async getAll(): Promise<ItemCategory[]> {
    const result = await this.find()
    return result
  }

  // fn getOne ItemCategory by id
  public async getOneByID(id: number): Promise<ItemCategory[]> {
    const result = await this.find({
      where: { id }
    })
    return result
  }

  // fn delete ItemCategory
  public async Delete(itemcategory: ItemCategory): Promise<ItemCategory> {
    return await this.remove(itemcategory)
  }

  // fn update ItemCategory
  public async Update(id: number, itemcategory: ItemCategory): Promise<ItemCategory> {
    await this.manager.update(ItemCategory, id, itemcategory)
    return itemcategory
  }

}
export default ItemCategoryRepository
