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
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../guards/roles.decorator';
import { UserRole } from '../entities/user.entity';
import { UpdateBookDto } from './dtos/update-book.dto';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Books') // Grouping APIs under "Books"
@ApiBearerAuth() // Add authentication support in Swagger
@Controller('books')
export class BooksController {
  constructor(private bookService: BooksService) {}

  // Create a new book (Admin only)
  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create a new book (Admin only)' })
  @ApiResponse({ status: 201, description: 'Book created successfully' })
  @ApiResponse({
    status: 403,
    description: 'Forbidden - Only admins can create books',
  })
  @ApiBody({ type: CreateBookDto })
  createBook(@Body() createBookDto: CreateBookDto) {
    return this.bookService.createBook(createBookDto);
  }

  // Update a book (Admin only)
  @Put(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update a book (Admin only)' })
  @ApiParam({ name: 'id', type: Number, description: 'Book ID' })
  @ApiResponse({ status: 200, description: 'Book updated successfully' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  @ApiBody({ type: UpdateBookDto })
  updateBook(@Param('id') id: number, @Body() updateBookDto: UpdateBookDto) {
    return this.bookService.updateBook(id, updateBookDto);
  }

  // Delete a book (Admin only)
  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete a book (Admin only)' })
  @ApiParam({ name: 'id', type: Number, description: 'Book ID' })
  @ApiResponse({ status: 200, description: 'Book deleted successfully' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  deleteBook(@Param('id') id: number) {
    return this.bookService.deleteBook(id);
  }

  // Get all books (Admin only)
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Get all books (Admin only)' })
  @ApiResponse({ status: 200, description: 'List of all books' })
  getAllBooks() {
    return this.bookService.getAllBooks();
  }

  // Get available books  (Members only)
  @Get('available')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MEMBER)
  @ApiOperation({ summary: 'Get available books (Members only)' })
  @ApiResponse({ status: 200, description: 'List of available books' })
  getAvailableBooks() {
    return this.bookService.getAvailableBooks();
  }

  // Search books by title or author
  @Get('search')
  @ApiOperation({ summary: 'Search books by title or author' })
  @ApiResponse({ status: 200, description: 'List of matching books' })
  searchBooks(@Query('query') query: string) {
    return this.bookService.searchBooks(query);
  }

  // Check book availability
  @Get(':id/availability')
  @ApiOperation({ summary: 'Check if a book is available' })
  @ApiParam({ name: 'id', type: Number, description: 'Book ID' })
  @ApiResponse({ status: 200, description: 'Book availability status' })
  @ApiResponse({ status: 404, description: 'Book not found' })
  checkBookAvailability(@Param('id') id: number) {
    return this.bookService.checkAvailability(id);
  }
}
