import { EntityRepository, Repository } from 'typeorm'
import ProductCategory from '../entities/ProductCategory'

@EntityRepository(ProductCategory)
export class ProductCategoryRepository extends Repository<ProductCategory> {

  // fn Save ProductCategory
  public async Save(productcategory: ProductCategory): Promise<ProductCategory> {
    await this.save(productcategory)
    return productcategory
  }

  // fn getAll ProductCategory
  public async getAll(): Promise<ProductCategory[]> {
    const result = await this.find({
      order: { id: 'ASC' },
    })
    return result
  }

  // fn getOne ProductCategory by id
  public async getOneByID(id: number): Promise<ProductCategory[]> {
    const result = await this.find({
      where: { id },
      order: { id: 'ASC' },

    })
    return result
  }

  // fn delete ProductCategory
  public async Delete(productcategory: ProductCategory): Promise<ProductCategory> {
    return await this.remove(productcategory)
  }

  // fn update ProductCategory
  public async Update(id: number, productcategory: ProductCategory): Promise<ProductCategory> {
    await this.manager.update(ProductCategory, id, productcategory)
    return productcategory
  }

  public async Count(): Promise<[ProductCategory[], number]> {
    return await this.findAndCount()
  }

}
export default ProductCategoryRepository
