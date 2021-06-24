import { EntityRepository, Repository } from 'typeorm'
import { ItemHistoryWithdraw } from '../entities/ItemHistoryWithdraw';

@EntityRepository(ItemHistoryWithdraw)
export class ItemHistoryWithdrawRepository extends Repository<ItemHistoryWithdraw> {

  // fn Save ItemHistoryWithdraw
  public async Save(itemHistoryWithdraw: ItemHistoryWithdraw): Promise<ItemHistoryWithdraw> {
    await this.save(itemHistoryWithdraw)
    return itemHistoryWithdraw
  }

  // fn getAll ItemHistoryWithdraw
  public async getAll(): Promise<ItemHistoryWithdraw[]> {
    const result = await this.find({
      order: { updated: 'DESC' },
      relations: ['item', 'itemWithdraw']
    })
    return result
  }

  // fn getAllbyIditem ItemHistoryWithdraw by idItem
  public async getAllbyIditem(id: number): Promise<ItemHistoryWithdraw[]> {
    const result = await this.find({
      where: {
        item: { id }
      },
      relations: ['item', 'itemWithdraw']
    })
    return result
  }

  // fn delete ItemHistoryWithdraw
  public async Delete(itemHistoryWithdraw: ItemHistoryWithdraw): Promise<ItemHistoryWithdraw> {
    return await this.remove(itemHistoryWithdraw)
  }

  // fn update ItemHistoryWithdraw
  public async Update(id: number, itemHistoryWithdraw: ItemHistoryWithdraw): Promise<ItemHistoryWithdraw> {
    await this.manager.update(ItemHistoryWithdraw, id, itemHistoryWithdraw)
    return itemHistoryWithdraw
  }

}
export default ItemHistoryWithdrawRepository
