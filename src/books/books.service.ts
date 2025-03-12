import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBookDto } from './dtos/create-book.dto';
import { UpdateBookDto } from './dtos/update-book.dto';
import { Book } from 'src/entities/book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}

  //Create a new Book (Admin only access)
  async createBook(createBookDto: CreateBookDto): Promise<Book> {
    const book = this.bookRepository.create(createBookDto);
    return this.bookRepository.save(book);
  }

  // Update a book (Admin only)
  async updateBook(id: number, updateBookDto: UpdateBookDto): Promise<Book> {
    const book = await this.bookRepository.findOne({ where: { id } });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    // Update book properties
    Object.assign(book, updateBookDto);

    return this.bookRepository.save(book);
  }

  // Delete a book (Admin only)
  async deleteBook(id: number): Promise<void> {
    const result = await this.bookRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
  }

  // Get all books (Admin only)
  async getAllBooks(): Promise<Book[]> {
    return this.bookRepository.find();
  }

  // Get available books (Members only)
  async getAvailableBooks(): Promise<Book[]> {
    return this.bookRepository.find({ where: { available: true } });
  }

  // Search books by title or author
  searchBooks(query: string): Promise<Book[]> {
    return this.bookRepository
      .createQueryBuilder('book')
      .where('book.title LIKE :query OR book.author LIKE :query', {
        query: `%${query}%`,
      })
      .getMany();
  }

  // Check book availability
  async checkAvailability(id: number): Promise<boolean> {
    const book = await this.bookRepository.findOne({ where: { id } });

    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }

    return book.available;
  }
}
