import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dtos/create-book.dto';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/roles.decorator';
import { UserRole } from 'src/entities/user.entity';
import { UpdateBookDto } from './dtos/update-book.dto';

@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  // Create a new book (Admin only)
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  createBook(@Body() createBookDto: CreateBookDto) {
    return this.bookService.createBook(createBookDto);
  }

  // Update a book (Admin only)
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  updateBook(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.updateBook(id, updateBookDto);
  }

  // Delete a book (Admin only)
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  deleteBook(@Param('id') id: number) {
    return this.bookService.deleteBook(id);
  }

  // Get all books (Admin only)
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  getAllBooks() {
    return this.bookService.getAllBooks();
  }

  // Get available books
  @Get('available')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MEMBER)
  getAvailableBooks() {
    return this.bookService.getAvailableBooks();
  }

  // Search books by title or author
  @Get('search')
  searchBooks(@Query('query') query: string) {
    return this.bookService.searchBooks(query);
  }

  // Check book availability
  @Get(':id/availability')
  checkBookAvailability(@Param('id') id: number) {
    return this.bookService.checkAvailability(id);
  }
}
