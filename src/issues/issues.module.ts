import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Issue } from '../entities/issue.entity';
import { IssuesService } from './issues.service';
import { IssuesController } from './issues.controller';
import { BooksModule } from '../books/books.module';
import { User } from '../entities/user.entity';
import { Book } from '../entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Issue, Book, User]), BooksModule],
  providers: [IssuesService],
  controllers: [IssuesController],
  exports: [TypeOrmModule],
})
export class IssuesModule {}
