import { EntityRepository, Repository } from 'typeorm'
import ItemDeposit from '../entities/ItemDeposit'
import ItemDepositDetail from '../entities/ItemDepositDetail'

@EntityRepository(ItemDepositDetail)
export class ItemDepositDetailRepository extends Repository<ItemDepositDetail> {

  // fn saveItemWithdrawDetail
  public async Save(itemDepositDetail: ItemDepositDetail): Promise<ItemDepositDetail> {
    await this.save(itemDepositDetail)
    return itemDepositDetail
  }

  // fn getAllItemWithdrawDetail
  public async getAll(): Promise<ItemDepositDetail[]> {
    const result = await this.find({
      where: { activeStatus: true },
      order: { updated: 'DESC' },
      relations: ['item', 'itemDeposit']
    })
    return result
  }

  // fn getOneItemWithdrawDetail
  public async getOneByID(id: number): Promise<ItemDepositDetail[]> {
    const result = await this.find({
      where: { id, activeStatus: true },
      order: { updated: 'DESC' },
      relations: ['item', 'itemDeposit']
    })
    return result
  }
  public async getAllByItemdeposit(itemDeposit: ItemDeposit): Promise<ItemDepositDetail[]> {
    const result = await this.find({
      where: { itemDeposit, activeStatus: true },
      order: { updated: 'DESC' },
      relations: ['item', 'itemDeposit']
    })
    return result
  }

  // fn del itemWithDrawDetail
  public async Delete(itemDepositDetail: ItemDepositDetail): Promise<ItemDepositDetail> {
    return await this.remove(itemDepositDetail)
  }

  // fn updateItemWithdraw
  public async Update(id: number, itemDepositDetail: ItemDepositDetail): Promise<ItemDepositDetail> {
    await this.manager.update(ItemDepositDetail, id, itemDepositDetail)
    return itemDepositDetail
  }

}
export default ItemDepositDetailRepository
