import { EntityRepository, MoreThanOrEqual, Repository } from 'typeorm'
import Product from '../entities/Product'
import ProductStatus from '../entities/ProductStatus'
import ProductType from '../entities/ProductType'

@EntityRepository(Product)
export class ProductRepository extends Repository<Product> {

  // fn Save Product
  public async Save(product: Product): Promise<Product> {
    await this.save(product)
    return product
  }

  // fn getAll Product
  public async getAll(): Promise<Product[]> {
    const result = await this.find({
      where: { activeStatus: true },
      order: { updated: 'DESC' },
      relations: ['producttype', 'productstatus']
    })
    return result
  }

  // fn getOne Product by id
  public async getOneByID(id: number): Promise<Product[]> {
    const result = await this.find({
      where: { id, activeStatus: true },
      order: { updated: 'DESC' },
      relations: ['producttype', 'productstatus']
    })
    return result
  }

  public async getAllByTypeID(id: number): Promise<Product[]> {
    const result = await this.find({
      where: { producttype: { id }, activeStatus: true },
      order: { updated: 'DESC' },
      relations: ['producttype', 'productstatus']
    })
    return result
  }

  public async getAllByStatusID(id: number): Promise<Product[]> {
    const result = await this.find({
      where: { productstatus: { id }, activeStatus: true },
      order: { updated: 'DESC' },
      relations: ['producttype', 'productstatus']
    })
    return result
  }

  // fn delete Product
  public async Delete(product: Product): Promise<Product> {
    return await this.remove(product)
  }

  // fn update Product
  public async Update(id: number, product: Product): Promise<Product> {
    await this.manager.update(Product, id, product)
    return product
  }

}
export default ProductRepository
