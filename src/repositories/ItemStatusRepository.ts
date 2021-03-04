import { EntityRepository, Repository } from 'typeorm';
import ItemStatus from '../entities/ItemStatus';

@EntityRepository(ItemStatus)
export class ItemStatusRepository extends Repository<ItemStatus> {
  // fn Save ItemStatus
  public async Save(itemstatus: ItemStatus): Promise<ItemStatus> {
    await this.save(itemstatus);
    return itemstatus;
  }

  // fn getAll ItemStatus
  public async getAll(): Promise<ItemStatus[]> {
    const result = await this.find();
    return result;
  }

  // fn getOne ItemStatus by id
  public async getOneByID(id: number): Promise<ItemStatus[]> {
    const result = await this.find({
      where: { id },
    });
    return result;
  }

  // fn delete ItemStatus
  public async Delete(itemstatus: ItemStatus): Promise<ItemStatus> {
    return await this.remove(itemstatus);
  }

  // fn update ItemStatus
  public async Update(id: number, itemstatus: ItemStatus): Promise<ItemStatus> {
    await this.manager.update(ItemStatus, id, itemstatus);
    return itemstatus;
  }
}
export default ItemStatusRepository;
