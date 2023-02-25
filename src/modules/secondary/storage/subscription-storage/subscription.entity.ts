import {
  Column,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Product } from '../product-storage/product.entity';
import { User } from '../user-storage/user.entity';

@Entity('subscription')
export class Subscription {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    unique: true
  })
  invoiceId: string;

  @Column({
    nullable: false,
    unique: true
  })
  expireDate: Date;

  @OneToOne(() => User, (user) => user.id)
  user: User;

  @ManyToOne(() => Product, (product) => product.subscriptions)
  product: Product;
}
