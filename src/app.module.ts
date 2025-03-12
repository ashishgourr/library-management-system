import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { typeOrmConfig } from './config/typeorm.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LocalStrategy } from './users/local.strategy';
import { JwtStrategy } from './users/jwt.strategy';
import { IssuesController } from './issues/issues.controller';
import { IssuesService } from './issues/issues.service';
import { IssuesModule } from './issues/issues.module';
import { BooksService } from './books/books.service';
import { BooksController } from './books/books.controller';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: typeOrmConfig, // Use the typeOrmConfig function
    }),
    UsersModule,
    BooksModule,
    IssuesModule,
  ],
  controllers: [AppController, BooksController, IssuesController],
  providers: [
    AppService,
    LocalStrategy,
    JwtStrategy,
    IssuesService,
    BooksService,
  ],
})
export class AppModule {}

///==> Use this for SQLite database

// TypeOrmModule.forRoot({
//   type: 'sqlite',
//   database: 'db.sqlite',
//   entities: [User, Book],
//   synchronize: true,
// }),
