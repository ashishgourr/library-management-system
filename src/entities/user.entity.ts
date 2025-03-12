import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Issue } from './issue.entity';
//import { Exclude } from 'class-transformer';

export enum UserRole {
  ADMIN = 'admin',
  MEMBER = 'member',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.MEMBER })
  role: UserRole;

  @OneToMany(() => Issue, (issue) => issue.user)
  issues: Issue[];
}
