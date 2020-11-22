import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Product } from './Product';

@Entity()
export class ProductStatus {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public status: string = ''

  @Column({ readonly: true })
  public created: Date

  @Column()
  public updated: Date

  @OneToMany((type) => Product, (product) => product.productstatus)
  public product: ProductStatus[]

}

export default ProductStatus
