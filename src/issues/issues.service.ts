import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Issue, IssueStatus } from '../entities/issue.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from '../entities/book.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class IssuesService {
  constructor(
    @InjectRepository(Issue) private issueRepository: Repository<Issue>,

    @InjectRepository(Book) private bookRepository: Repository<Book>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  // Member: Request to issue a book
  async requestIssue(user: User, bookId: number): Promise<Issue> {
    // Fetch user
    const userEntity = await this.userRepository.findOne({
      where: { id: user.id },
    });

    if (!userEntity) {
      throw new NotFoundException('User not found.');
    }

    // Fetch book
    const book = await this.bookRepository.findOne({ where: { id: bookId } });

    if (!book) {
      throw new NotFoundException('Book not found.');
    }

    if (!book.available) {
      throw new BadRequestException({
        message:
          'The requested book is currently unavailable as it has already been issued to another user.',
        bookId: book.id,
        title: book.title,
        issuedTo: book.issues?.[0]?.user?.email || 'Unknown',
      });
    }
    console.log('✅ Book before update:', book);

    // Mark the book as unavailable
    book.available = false;
    // Save the book update
    await this.bookRepository.save(book);

    console.log('✅ Book after update:', book);

    // Create and save issue

    const issue = this.issueRepository.create({
      user: userEntity,
      book,
      status: IssueStatus.PENDING,
      issueDate: new Date(),
    });

    console.log('✅ Issue before save:', issue);
    return await this.issueRepository.save(issue);
  }

  // Admin: Approve or reject an issue request
  async updateIssueStatus(
    issueId: number,
    status: IssueStatus,
  ): Promise<Issue> {
    const issue = await this.issueRepository.findOne({
      where: { id: issueId },
      relations: ['book'],
    });

    if (!issue) {
      throw new NotFoundException('Issue request not found');
    }
    // Update issue status and book availability
    issue.status = status;

    if (status === IssueStatus.APPROVED) {
      issue.issueDate = new Date();
      issue.book.available = false;
    } else if (status === IssueStatus.REJECTED) {
      issue.book.available = true;
    }
    // Save the updated book and issue
    await this.bookRepository.save(issue.book);
    return this.issueRepository.save(issue);
  }

  // Member: Request to return a book
  async requestReturn(issueId: number): Promise<Issue> {
    const issue = await this.issueRepository.findOne({
      where: { id: issueId },
      relations: ['book'],
    });

    if (!issue) {
      throw new NotFoundException('Issue request not found');
    }
    // Update issue status to pending
    issue.status = IssueStatus.PENDING;
    return this.issueRepository.save(issue);
  }

  // Admin: Approve or reject a return request
  async updateReturnStatus(
    issueId: number,
    status: IssueStatus,
  ): Promise<Issue> {
    const issue = await this.issueRepository.findOne({
      where: { id: issueId },
      relations: ['book'],
    });
    if (!issue) {
      throw new NotFoundException('Issue request not found');
    }
    // Update issue status and book availability

    issue.status = status;

    if (status === IssueStatus.RETURNED) {
      issue.returnDate = new Date();
      issue.book.available = true;
    }
    // Save the updated book and issue
    await this.bookRepository.save(issue.book);
    return this.issueRepository.save(issue);
  }

  // Get all issues (for admin)
  async getAllIssues(): Promise<Issue[]> {
    return this.issueRepository.find({ relations: ['user', 'book'] });
  }
}
