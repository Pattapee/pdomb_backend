import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
@Entity()
export class ItemCategory {
  @PrimaryGeneratedColumn()
  public id: number

  @Column()
  public category: string = ''

  @Column({ readonly: true })
  public created: Date

  @Column()
  public updated: Date

  @OneToMany((type) => ItemCategory, (itemcategory) => itemcategory.itemtype)
  public itemtype: ItemCategory[]
}

export default ItemCategory
