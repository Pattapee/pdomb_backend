import { EntityRepository, Repository } from 'typeorm';
import ProductStatus from '../entities/ProductStatus';

@EntityRepository(ProductStatus)
export class ProductStatusRepository extends Repository<ProductStatus> {
  // fn Save ProductStatus
  public async Save(productstatus: ProductStatus): Promise<ProductStatus> {
    await this.save(productstatus);
    return productstatus;
  }

  // fn getAll ProductStatus
  public async getAll(): Promise<ProductStatus[]> {
    const result = await this.find();
    return result;
  }

  // fn getOne ProductStatus by id
  public async getOneByID(id: number): Promise<ProductStatus[]> {
    const result = await this.find({
      where: { id },
    });
    return result;
  }

  // fn delete ProductStatus
  public async Delete(productstatus: ProductStatus): Promise<ProductStatus> {
    return await this.remove(productstatus);
  }

  // fn update ProductStatus
  public async Update(id: number, productstatus: ProductStatus): Promise<ProductStatus> {
    await this.manager.update(ProductStatus, id, productstatus);
    return productstatus;
  }
}
export default ProductStatusRepository;
