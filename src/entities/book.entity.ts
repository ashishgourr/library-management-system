import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Issue } from './issue.entity';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;

  @Column({ default: true })
  available: boolean;

  @OneToMany(() => Issue, (issue) => issue.book)
  issues: Issue[];
}
