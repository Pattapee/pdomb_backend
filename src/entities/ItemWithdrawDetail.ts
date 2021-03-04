import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm'
import { Item } from './Item'
import { ItemWithdraw } from './ItemWithdraw'
@Entity()
export class ItemWithdrawDetail {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public amount: number

  @Column({ readonly: true })
  public created: Date

  @Column()
  public updated: Date

  @ManyToOne((type) => Item, (item) => item.itemWithdrawDetail)
  public item: Item

  @ManyToOne((type) => ItemWithdraw, (itemWithdraw) => itemWithdraw.itemWithdrawDetail,
    { onDelete: 'CASCADE' })
  public itemWithdraw: ItemWithdraw

  @Column({ default: true })
  public activeStatus: boolean

}

export default ItemWithdrawDetail
