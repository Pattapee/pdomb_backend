import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { Item } from './Item'
import { ItemCategory } from './ItemCategory'

@Entity()
export class ItemType {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public type: string = ''

  @Column({ readonly: true })
  public created: Date

  @Column()
  public updated: Date

  @ManyToOne((type) => ItemCategory, (itemcategory) => itemcategory.itemtype)
  public itemcategorys: ItemCategory

  @OneToMany((type) => Item, (item) => item.itemtypes)
  public items: Item[]
}

export default ItemType
