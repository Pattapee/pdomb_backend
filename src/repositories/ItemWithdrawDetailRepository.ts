import { EntityRepository, Repository } from 'typeorm'
import Itemwithdraw from '../entities/ItemWithdraw'
import ItemWithdrawDetail from '../entities/ItemWithdrawDetail'

@EntityRepository(ItemWithdrawDetail)
export class ItemWithdrawDetailRepository extends Repository<ItemWithdrawDetail> {

  // fn saveItemWithdrawDetail
  public async Save(itemWithdrawDetail: ItemWithdrawDetail): Promise<ItemWithdrawDetail> {
    await this.save(itemWithdrawDetail)
    return itemWithdrawDetail
  }

  // fn getAllItemWithdrawDetail
  public async getAll(): Promise<ItemWithdrawDetail[]> {
    const result = await this.find({
      where: { activeStatus: true },
      order: { updated: 'DESC' },
      relations: ['item', 'itemWithdraw']
    })
    return result
  }

  // fn getOneItemWithdrawDetail
  public async getOneByID(id: number): Promise<ItemWithdrawDetail[]> {
    const result = await this.find({
      where: { id, activeStatus: true },
      order: { updated: 'DESC' },
      relations: ['item', 'itemWithdraw']
    })
    return result
  }
  public async getAllByItemwithdraw(itemWithdraw: Itemwithdraw): Promise<ItemWithdrawDetail[]> {
    const result = await this.find({
      where: { itemWithdraw, activeStatus: true },
      order: { updated: 'DESC' },
      relations: ['item', 'itemWithdraw']
    })
    return result
  }

  // fn del itemWithDrawDetail
  public async Delete(itemWithdrawDetail: ItemWithdrawDetail): Promise<ItemWithdrawDetail> {
    return await this.remove(itemWithdrawDetail)
  }

  // fn updateItemWithdraw
  public async Update(id: number, itemWithdrawDetail: ItemWithdrawDetail): Promise<ItemWithdrawDetail> {
    await this.manager.update(ItemWithdrawDetail, id, itemWithdrawDetail)
    return itemWithdrawDetail
  }

}
export default ItemWithdrawDetailRepository
