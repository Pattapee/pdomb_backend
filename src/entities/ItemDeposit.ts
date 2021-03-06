import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class ItemDeposit {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public no: string = '';

  @Column()
  public company: string = '';

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 0, })
  public nettotal: number = 0

  @Column({ readonly: true })
  public created: Date;

  @Column()
  public dateimport: Date;

  @Column()
  public datereceived: Date;

  @Column()
  public remark: string = '';

  @Column()
  public updated: Date;

  @OneToMany((type) => ItemDeposit, (itemDeposit) => itemDeposit.itemDepositDetail,
    { onDelete: 'CASCADE' })
  public itemDepositDetail: ItemDeposit[];

  @OneToMany((type) => ItemDeposit, (itemDeposit) => itemDeposit.itemDepositHistoryDetail,
    { onDelete: 'CASCADE' })
  public itemDepositHistoryDetail: ItemDeposit[];

  @Column({ default: true })
  public activeStatus: boolean;
}

export default ItemDeposit;
