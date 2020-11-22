import { EntityRepository, Repository } from 'typeorm'
import ProductType from '../entities/ProductType'

@EntityRepository(ProductType)
export class ProductTypeRepository extends Repository<ProductType> {

  // fn Save ProductType
  public async Save(producttype: ProductType): Promise<ProductType> {
    await this.save(producttype)
    return producttype
  }

  // fn getAll ProductType
  public async getAll(): Promise<ProductType[]> {
    const result = await this.find({
      relations: ['productcategorys'],
      order: { id: 'ASC' },
    })
    return result
  }

  // fn getOne ProductType by id
  public async getOneByID(id: number): Promise<ProductType[]> {
    const result = await this.find({
      where: { id },
      relations: ['productcategorys'],
      order: { id: 'ASC' },
    })
    return result
  }

  // fn getAll ProductType by Category ID
  public async getAllByCategoryID(id: number): Promise<ProductType[]> {
    const result = await this.find({
      where: { productcategorys: { id } },
      relations: ['productcategorys'],
      order: { id: 'ASC' },

    })
    return result
  }

  // fn delete ProductType
  public async Delete(producttype: ProductType): Promise<ProductType> {
    return await this.remove(producttype)
  }

  // fn update ProductType
  public async Update(id: number, producttype: ProductType): Promise<ProductType> {
    await this.manager.update(ProductType, id, producttype)
    return producttype
  }

}
export default ProductTypeRepository
