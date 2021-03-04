import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
@Entity()
export class ItemWithdraw {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public remark: string = ''

  @Column()
  public no: string = ''

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
  public empusername: string = ''

  @Column()
  public datewithdraw: Date

  @Column({ readonly: true })
  public created: Date

  @Column({ default: true })
  public activeStatus: boolean

  @Column()
  public updated: Date

  @OneToMany((type) => ItemWithdraw, (itemWithdraw) => itemWithdraw.itemWithdrawDetail,
    { onDelete: 'CASCADE' })
  public itemWithdrawDetail: ItemWithdraw[]

  @OneToMany((type) => ItemWithdraw, (itemWithdraw) => itemWithdraw.itemWithdrawHistoryDetail,
    { onDelete: 'CASCADE' })
  public itemWithdrawHistoryDetail: ItemWithdraw[]

  @Column()
  public approved1: boolean

  @Column()
  public approved2: boolean

}

export default ItemWithdraw
