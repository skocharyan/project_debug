import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../user-storage/user.entity';

@Entity('deepgram')
export class DeepGram {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
    unique: true
  })
  keyId: string;

  @Column({
    nullable: false,
    unique: true
  })
  key: string;

  @OneToOne(() => User, (user) => user.deepGram)
  user: User;
}
