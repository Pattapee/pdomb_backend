import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
@Entity()
export class ProductCategory {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public category: string = ''

  @Column({ readonly: true })
  public created: Date

  @Column()
  public updated: Date

  @OneToMany((type) => ProductCategory, (productcategory) => productcategory.producttype)
  public producttype: ProductCategory[]
}

export default ProductCategory
