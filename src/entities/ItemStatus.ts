import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Item } from './Item'

@Entity()
export class ItemStatus {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public status: string = ''

  @Column({ readonly: true })
  public created: Date

  @Column()
  public updated: Date

  @OneToMany((type) => Item, (item) => item.itemstatus)
  public items: ItemStatus[]
}

export default ItemStatus
