import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Subscription } from '../subscription-storage/subscription.entity';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    unique: true
  })
  productId: number;

  @Column({
    nullable: false,
    unique: true
  })
  productName: string;

  @OneToMany(() => Subscription, (subscription) => subscription.product)
  subscriptions: Subscription[];
}
