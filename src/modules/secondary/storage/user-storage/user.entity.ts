import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { HASH_ROUNDS_QTY } from '@modules/secondary/crypto/constants';
import * as bcrypt from 'bcryptjs';
import { DeepGram } from '../deepgram-storage/deppgram.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: true
  })
  firstName: string;

  @Column({
    nullable: true
  })
  lastName: string;

  @Column({
    nullable: true
  })
  middleName: string;

  @Column({
    unique: true
  })
  email: string;

  @Column({
    nullable: true
  })
  password: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToOne(() => DeepGram)
  @JoinColumn()
  deepGram: DeepGram;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, HASH_ROUNDS_QTY);
  }
}
