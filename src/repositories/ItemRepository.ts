import { EntityRepository, MoreThanOrEqual, Repository } from 'typeorm'
import Item from '../entities/Item'
import ItemType from '../entities/ItemType'

@EntityRepository(Item)
export class ItemRepository extends Repository<Item> {

  // fn Save Item
  public async Save(item: Item): Promise<Item> {
    await this.save(item)
    return item
  }

  // fn getAll Item
  public async getAll(): Promise<Item[]> {
    const result = await this.find({
      where: { activeStatus: true },
      order: { updated: 'DESC' },
      relations: ['itemtypes', 'itemstatus']
    })
    return result
  }

  public async getItemforwithdraw(): Promise<Item[]> {
    const result = await this.find({
      where: { activeStatus: true, balance: MoreThanOrEqual(1) },
      order: { updated: 'DESC' },
      relations: ['itemtypes', 'itemstatus']
    })
    return result
  }

  // fn getOne Item by id
  public async getOneByID(id: number): Promise<Item[]> {
    const result = await this.find({
      where: { id, activeStatus: true },
      order: { updated: 'DESC' },
      relations: ['itemtypes', 'itemstatus']
    })
    return result
  }

  public async getOneBycodename(codename: string): Promise<Item[]> {
    const result = await this.find({
      where: { codename, activeStatus: true },
      order: { updated: 'DESC' },
      relations: ['itemtypes', 'itemstatus']
    })
    return result
  }

  public async getAllByitemTypes(itemtype: ItemType): Promise<Item[]> {
    const result = await this.find({
      where: { itemtypes: itemtype, activeStatus: true },
      order: { updated: 'DESC' },
      relations: ['itemtypes', 'itemstatus']
    })
    return result
  }

  // fn delete Item
  public async Delete(item: Item): Promise<Item> {
    return await this.remove(item)
  }

  // fn update Item
  public async Update(id: number, item: Item): Promise<Item> {
    await this.manager.update(Item, id, item)
    return item
  }

}
export default ItemRepository
