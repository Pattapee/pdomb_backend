import { HexBase64BinaryEncoding } from 'crypto'
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { ProductStatus } from './ProductStatus';
import { ProductType } from './ProductType';
@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public uuid: string = ''

  @Column()
  public code: string = ''

  @Column()
  public serial_number: string = ''

  @Column()
  public license_number: string = ''

  @Column()
  public name: string = ''

  @Column()
  public datereceived: Date

  @Column()
  public datereceivedconfirm: Date

  @Column()
  public datewarranty: Date

  @Column()
  public price: number

  @Column()
  public refmoney: string = ''

  @Column()
  public ownerid: number

  @Column()
  public ownername: string = ''

  @Column()
  public ownerdepartment: string = ''

  @Column()
  public ownernamehistory: string = ''

  @Column()
  public ownerdepartmenthistory: string = ''

  @Column()
  public ageproductyear: number

  @Column()
  public ageproductmonth: number

  @Column()
  public ageproductday: number

  @Column()
  public remark: string = ''

  @Column()
  public atarea: string = ''

  @Column({ readonly: true })
  public created: Date

  @Column()
  public updated: Date

  @Column({ type: 'longtext' })
  public picture: HexBase64BinaryEncoding

  @Column({ default: true })
  public activeStatus: boolean

  @ManyToOne((type) => ProductStatus, (productstatus) => productstatus.product)
  public productstatus: ProductStatus

  @ManyToOne((type) => ProductType, (producttype) => producttype.product)
  public producttype: ProductType
}

export default Product
