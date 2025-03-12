import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Book } from './book.entity';

export enum IssueStatus {
  PENDING = 'pending',
  APPROVED = 'approved',
  REJECTED = 'rejected',
  RETURNED = 'returned',
}

@Entity()
export class Issue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'enum', enum: IssueStatus, default: IssueStatus.PENDING })
  status: IssueStatus;

  @Column({ nullable: true })
  issueDate: Date;

  @Column({ nullable: true })
  returnDate: Date;

  @ManyToOne(() => User, (user) => user.issues)
  user: User;

  @ManyToOne(() => Book, (book) => book.issues)
  book: Book;
}
