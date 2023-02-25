import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';
import { HASH_ROUNDS_QTY } from '@modules/secondary/crypto/constants';
import * as bcrypt from 'bcryptjs';
import { DeepGram } from '../deepgram-storage/deppgram.entity';
import { Subscription } from '../subscription-storage/subscription.entity';
import { License } from '../license-storage/license.entity';

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

  @Column({
    nullable: false,
    unique: false
  })
  credits: number;

  @Column({
    nullable: false,
    unique: false
  })
  lastLogin: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToOne(() => DeepGram)
  @JoinColumn()
  deepGram: DeepGram;

  @OneToOne(() => Subscription)
  @JoinColumn()
  subscription: Subscription;

  @OneToMany(() => License, (license) => license.user)
  licenses: License[];

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, HASH_ROUNDS_QTY);
  }
}
