import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../users/user.entity';

@Entity()
export class Document {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  filePath: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User)
  uploadedBy: User;
}