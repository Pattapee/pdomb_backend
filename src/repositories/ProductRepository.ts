import { EntityRepository, getConnection, MoreThanOrEqual, Repository } from 'typeorm'
import Product from '../entities/Product'

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

  public async getAllByStatusAndType(idstatus: number, idtype: number): Promise<Product[]> {
    const result = await this.find({
      where: {
        productstatus: { id: idstatus },
        producttype: { id: idtype },
        activeStatus: true
      },
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

  // fn Count Dashboard
  public async getCountByCategoryandstatus(category: number, status: number): Promise<number> {
    const query = `select COUNT(p.id) as countProduct
    from product p
    left outer join product_type pt on pt.id = p.producttypeId
    where p.productstatusId = ${status}
    and pt.productcategorysId = ${category}
    and p.activeStatus = true`;
    const result = await getConnection().query(query)
    return result[0].countProduct
  }

  public async getAlllimit(id: number, count: number): Promise<Product[]> {
    const query = `
    select p.code ,p.name, p.ownername, p.ownerdepartment, p.atarea
    from product p
    JOIN product_type pt on pt.id = p.producttypeId
    where pt.productcategorysId = ${id}
    and p.activeStatus = true
    order by p.updated desc
    limit ${count}`
    const result = await getConnection().query(query)
    return result
  }

}
export default ProductRepository
