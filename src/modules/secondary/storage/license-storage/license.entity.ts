import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../user-storage/user.entity';
import { StatusType } from './models';

@Entity('license')
export class License {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    unique: true
  })
  key: string;

  @Column({
    nullable: false,
    unique: true
  })
  status: StatusType;

  @ManyToOne(() => User, (user) => user.licenses)
  user: User;
}
