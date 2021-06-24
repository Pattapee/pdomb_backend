import { EntityRepository, MoreThanOrEqual, Repository } from 'typeorm'
import { ItemHistoryDeposit } from '../entities/ItemHistoryDeposit';

@EntityRepository(ItemHistoryDeposit)
export class ItemHistoryDepositRepository extends Repository<ItemHistoryDeposit> {

  // fn Save ItemHistoryDeposit
  public async Save(itemHistoryDeposit: ItemHistoryDeposit): Promise<ItemHistoryDeposit> {
    await this.save(itemHistoryDeposit)
    return itemHistoryDeposit
  }

  // fn getAll ItemHistoryDeposit
  public async getAll(): Promise<ItemHistoryDeposit[]> {
    const result = await this.find({
      order: { updated: 'DESC' },
      relations: ['itemDeposit']

    })
    return result
  }

  // fn getAllbyamountbalance for change amount
  public async getAllbyamountbalance(item: any): Promise<ItemHistoryDeposit[]> {
    const result = await this.find({
      where: {
        item,
        amountbalance: MoreThanOrEqual(1),
      },
      order: { created: 'ASC' },
    })
    return result
  }

  // fn getAllbyIditem ItemHistoryDeposit by idItem
  public async getAllbyIditem(id: number): Promise<ItemHistoryDeposit[]> {
    const result = await this.find({
      where: {
        item: { id }
      },
      relations: ['itemDeposit']
    })
    return result
  }

  // fn delete ItemHistoryDeposit
  public async Delete(itemHistoryDeposit: ItemHistoryDeposit): Promise<ItemHistoryDeposit> {
    return await this.remove(itemHistoryDeposit)
  }

  // fn update ItemHistoryDeposit
  public async Update(id: number, itemHistoryDeposit: ItemHistoryDeposit): Promise<ItemHistoryDeposit> {
    await this.manager.update(ItemHistoryDeposit, id, itemHistoryDeposit)
    return itemHistoryDeposit
  }

}
export default ItemHistoryDepositRepository
