import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Product } from './Product';
import { ProductCategory } from './ProductCategory'
@Entity()
export class ProductType {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public type: string = ''

  @Column({ readonly: true })
  public created: Date

  @Column()
  public updated: Date

  @OneToMany((type) => Product, (product) => product.producttype)
  public product: ProductType[]

  @ManyToOne((type) => ProductCategory, (productcategory) => productcategory.producttype)
  public productcategorys: ProductCategory
}

export default ProductType
