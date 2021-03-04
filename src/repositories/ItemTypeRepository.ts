import { EntityRepository, Repository } from 'typeorm'
import ItemType from '../entities/ItemType'

@EntityRepository(ItemType)
export class ItemTypeRepository extends Repository<ItemType> {

  // fn Save ItemType
  public async Save(itemtype: ItemType): Promise<ItemType> {
    await this.save(itemtype)
    return itemtype
  }

  // fn getAll ItemType
  public async getAll(): Promise<ItemType[]> {
    const result = await this.find({
      relations: ['itemcategorys']
    })
    return result
  }

  // fn getOne ItemType by id
  public async getOneByID(id: number): Promise<ItemType[]> {
    const result = await this.find({
      where: { id },
      relations: ['itemcategorys']
    })
    return result
  }

  // fn getAll ItemType by Category ID
  public async getAllByCategoryID(id: number): Promise<ItemType[]> {
    const result = await this.find({
      where: { itemcategorys: { id } },
      relations: ['itemcategorys']
    })
    return result
  }

  // fn delete ItemType
  public async Delete(itemtype: ItemType): Promise<ItemType> {
    return await this.remove(itemtype)
  }

  // fn update ItemType
  public async Update(id: number, itemtype: ItemType): Promise<ItemType> {
    await this.manager.update(ItemType, id, itemtype)
    return itemtype
  }

}
export default ItemTypeRepository
