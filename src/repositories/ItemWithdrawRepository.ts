import { EntityRepository, Repository } from 'typeorm'
import ItemWithdraw from '../entities/ItemWithdraw'

@EntityRepository(ItemWithdraw)
export class ItemWithdrawRepository extends Repository<ItemWithdraw> {

  // fn saveitemWithdraw
  public async Save(itemWithdraw: ItemWithdraw): Promise<ItemWithdraw> {
    await this.save(itemWithdraw)
    return itemWithdraw
  }

  // fn getAllItemWithdraw
  public async getAll(): Promise<ItemWithdraw[]> {
    const result = await this.find({
      where: { activeStatus: true },
      order: { updated: 'DESC' }
    })
    return result
  }

  // fn getOneItemWithdraw
  public async getOneByID(id: number): Promise<ItemWithdraw[]> {
    const result = await this.find({
      where: { id, activeStatus: true },
      order: { updated: 'DESC' }
    })
    return result
  }

  // fn delItemWithdraw
  public async Delete(itemWithdraw: ItemWithdraw): Promise<ItemWithdraw> {
    return await this.remove(itemWithdraw)
  }

  // fn updateItemWithdraw
  public async Update(id: number, itemWithdraw: ItemWithdraw): Promise<ItemWithdraw> {
    await this.manager.update(ItemWithdraw, id, itemWithdraw)
    return itemWithdraw
  }

  public async getOneByuserID(id: string): Promise<ItemWithdraw[]> {
    const result = await this.find({
      where: { userid: id, activeStatus: true },
      order: { updated: 'DESC' }
    })
    return result
  }

  public async getOneByusername(name: string): Promise<ItemWithdraw[]> {
    const result = await this.find({
      where: { username: name, activeStatus: true },
      order: { updated: 'DESC' }
    })
    return result
  }

  public async getOneBydepartment(department: string): Promise<ItemWithdraw[]> {
    const result = await this.find({
      where: { department, activeStatus: true },
      order: { updated: 'DESC' }
    })
    return result
  }

}
export default ItemWithdrawRepository
