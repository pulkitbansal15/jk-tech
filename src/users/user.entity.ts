import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

export type UserRole = 'admin' | 'editor' | 'viewer';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: 'viewer' })
  role: UserRole;
}
