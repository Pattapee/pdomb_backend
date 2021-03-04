import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './Item';
import { ItemWithdraw } from './ItemWithdraw'

@Entity()
export class ItemHistoryWithdraw {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne((type) => Item, (item) => item.itemHistoryWithdraw)
  public item: Item;

  @Column()
  public amount: number

  @Column()
  public balance: number

  @Column()
  public cusid: string = ''

  @Column()
  public cusfullname: string = ''

  @Column()
  public cusemail: string = ''

  @Column()
  public cusposition: string = ''

  @Column()
  public cusdepartment: string = ''

  @Column()
  public datewithdraw: Date

  @ManyToOne((type) => ItemWithdraw, (itemWithdraw) => itemWithdraw.itemWithdrawHistoryDetail,
    { onDelete: 'CASCADE' })
  public itemWithdraw: ItemWithdraw

  @Column({ readonly: true })
  public created: Date;

  @Column()
  public updated: Date;

}

export default ItemHistoryWithdraw;
