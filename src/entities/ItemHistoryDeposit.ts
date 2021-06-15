import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './Item';
import { ItemDeposit } from './ItemDeposit';

@Entity()
export class ItemHistoryDeposit {
  @PrimaryGeneratedColumn()
  public id: number;

  @ManyToOne((type) => Item, (item) => item.itemHistoryDeposit)
  public item: Item;

  @Column()
  public amount: number

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0, })
  public price: number

  @Column()
  public balance: number

  @Column()
  public company: string

  @Column()
  public dateimport: Date

  @Column()
  public datereceived: Date

  @ManyToOne((type) => ItemDeposit, (itemDeposit) => itemDeposit.itemDepositHistoryDetail,
    { onDelete: 'CASCADE' })
  public itemDeposit: ItemDeposit;

  @Column({ readonly: true })
  public created: Date;

  @Column()
  public updated: Date;

}

export default ItemHistoryDeposit;
