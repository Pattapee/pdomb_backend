import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './Item';
import { ItemDeposit } from './ItemDeposit';
@Entity()
export class ItemDepositDetail {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public amount: number;

  @Column()
  public price: number;

  @Column({ readonly: true })
  public created: Date;

  @Column()
  public updated: Date;

  @ManyToOne((type) => Item, (item) => item.itemDepositDetail)
  public item: Item;

  @ManyToOne((type) => ItemDeposit, (itemDeposit) => itemDeposit.itemDepositDetail,
    { onDelete: 'CASCADE' })
  public itemDeposit: ItemDeposit;

  @Column({ default: true })
  public activeStatus: boolean;
}

export default ItemDepositDetail;
