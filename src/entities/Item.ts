import { HexBase64BinaryEncoding } from 'crypto'
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { ItemStatus } from './ItemStatus'
import { ItemType } from './ItemType'
@Entity()
export class Item {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public uuid: string = ''

  @Column()
  public codename: string = ''

  @Column()
  public itemname: string = ''

  @Column()
  public quantityname: string = ''

  @Column()
  public balance: number

  @Column()
  public minimum: number

  @Column()
  public remark: string = ''

  @Column({ readonly: true })
  public created: Date

  @Column()
  public updated: Date

  @Column({ type: 'longtext' })
  public picture: HexBase64BinaryEncoding

  @Column({ default: true })
  public activeStatus: boolean

  @ManyToOne((type) => ItemType, (itemtype) => itemtype.items)
  public itemtypes: ItemType

  @ManyToOne((type) => ItemStatus, (itemstatus) => itemstatus.items)
  public itemstatus: ItemStatus

  @OneToMany((type) => Item, (item) => item.itemWithdrawDetail)
  public itemWithdrawDetail: Item[]

  @OneToMany((type) => Item, (item) => item.itemDepositDetail)
  public itemDepositDetail: Item[]

  @OneToMany((type) => Item, (item) => item.itemHistoryWithdraw)
  public itemHistoryWithdraw: Item[]

  @OneToMany((type) => Item, (item) => item.itemHistoryDeposit)
  public itemHistoryDeposit: Item[]

}

export default Item
