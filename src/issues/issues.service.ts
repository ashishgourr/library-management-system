import { Injectable, NotFoundException } from '@nestjs/common';
import { Issue, IssueStatus } from 'src/entities/issue.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Book } from 'src/entities/book.entity';
import { User } from 'src/entities/user.entity';

@Injectable()
export class IssuesService {
  constructor(
    @InjectRepository(Issue) private issueRepository: Repository<Issue>,

    @InjectRepository(Book) private bookRepository: Repository<Book>,
  ) {}

  // Member: Request to issue a book
  async requestIssue(user: User, bookId: number): Promise<Issue> {
    const book = await this.bookRepository.findOne({ where: { id: bookId } });

    if (!book) {
      throw new NotFoundException('Book not found.');
    }

    if (!book.available) {
      throw new Error('Book is not available');
    }

    const issue = this.issueRepository.create({ user, book });
    return this.issueRepository.save(issue);
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

    if (status === IssueStatus.APPROVED) {
      issue.issueDate = new Date();
      issue.book.available = false;
    } else if (status === IssueStatus.REJECTED) {
      issue.book.available = true;
    }

    issue.status = status;

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

    if (status === IssueStatus.RETURNED) {
      issue.returnDate = new Date();
      issue.book.available = true;
    }

    issue.status = status;
    await this.bookRepository.save(issue.book);
    return this.issueRepository.save(issue);
  }

  // Get all issues (for admin)
  async getAllIssues(): Promise<Issue[]> {
    return this.issueRepository.find({ relations: ['user', 'book'] });
  }
}
