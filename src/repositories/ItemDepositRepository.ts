import { EntityRepository, Repository } from 'typeorm'
import ItemDeposit from '../entities/ItemDeposit'

@EntityRepository(ItemDeposit)
export class ItemDepositRepository extends Repository<ItemDeposit> {

  // fn Save ItemDeposit
  public async Save(itemDeposit: ItemDeposit): Promise<ItemDeposit> {
    await this.save(itemDeposit)
    return itemDeposit
  }

  // fn getAll ItemDeposit
  public async getAll(): Promise<ItemDeposit[]> {
    const result = await this.find({
      where: { activeStatus: true },
      order: { updated: 'DESC' },
    })
    return result
  }

  // fn getOne ItemDeposit by id
  public async getOneByID(id: number): Promise<ItemDeposit[]> {
    const result = await this.find({
      where: {id, activeStatus: true }
    })
    return result
  }

  // fn delete ItemDeposit
  public async Delete(itemDeposit: ItemDeposit): Promise<ItemDeposit> {
    return await this.remove(itemDeposit)
  }

  // fn update ItemDeposit
  public async Update(id: number, itemDeposit: ItemDeposit): Promise<ItemDeposit> {
    await this.manager.update(ItemDeposit, id, itemDeposit)
    return itemDeposit
  }

}
export default ItemDepositRepository
