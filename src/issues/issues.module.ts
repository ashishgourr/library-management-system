import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Issue } from 'src/entities/issue.entity';
import { IssuesService } from './issues.service';
import { IssuesController } from './issues.controller';
import { BooksModule } from 'src/books/books.module';
import { User } from 'src/entities/user.entity';
import { Book } from 'src/entities/book.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Issue, Book, User]), BooksModule],
  providers: [IssuesService],
  controllers: [IssuesController],
  exports: [TypeOrmModule],
})
export class IssuesModule {}
