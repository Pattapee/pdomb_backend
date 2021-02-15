import { EntityRepository, getConnection, MoreThanOrEqual, Repository } from 'typeorm'
import Product from '../entities/Product'
import ProductCategory from '../entities/ProductCategory'

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
  public async getCountByCategoryandstatus(productcategory: ProductCategory, status: number): Promise<Product[]> {
    // const result = await getConnection().createQueryBuilder()
    //   .select('id')
    //   .from(Product, 'prod')
    //   .where('producttype.productcategory.id = :id', { id: 2 })
    const result = await this.find({
      // productstatus: { id: status },
      where: { producttype: { productcategory: { id: 2 } } }
      , relations: ['producttype']
      // productcategorys: { id: 2 }
      // producttype: { id: 59 }
    })
    // const users = await this.createQueryBuilder()
    //   .select()
    //   .from(User, 'user')
    //   .where('user.name = :name', { name: 'John' })
    //   .getMany();

    // const result = await db.entityManager.query('select id, email, name from users where id=:PARAMID, [1]')
    // SELECT * FROM`product` p
    // left outer join product_type pt on pt.id = p.`producttypeId`
    // left outer join product_category pc on pc.id = pt.productcategorysId
    // where pc.id = 2 and p.`productstatusId` = 1

    // console.log(result)
    return result
  }
}
export default ProductRepository
