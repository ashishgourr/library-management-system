import {
  Body,
  Controller,
  Param,
  Post,
  Get,
  Req,
  UseGuards,
} from '@nestjs/common';

import { IssuesService } from './issues.service';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Roles } from 'src/guards/roles.decorator';
import { User, UserRole } from 'src/entities/user.entity';
import { IssueStatus } from 'src/entities/issue.entity';

@Controller('issues')
export class IssuesController {
  constructor(private issueService: IssuesService) {}

  // Member: Request to issue a book
  @Post('request')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MEMBER)
  requestIssue(
    @Body('bookId') bookId: number,
    @Req() req: Request & { user: User },
  ) {
    return this.issueService.requestIssue(req.user, bookId);
  }

  // Admin: Approve or reject an issue request
  @Post(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  updateIssueStatus(
    @Param('id') issueId: number,
    @Body('status') status: IssueStatus,
  ) {
    return this.issueService.updateIssueStatus(issueId, status);
  }

  // Member: Request to return a book
  @Post(':id/return')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MEMBER)
  requestReturn(@Param('id') issueId: number) {
    return this.issueService.requestReturn(issueId);
  }

  // Admin: Approve or reject a return request
  @Post(':id/return-status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  updateReturnStatus(
    @Param('id') issueId: number,
    @Body('status') status: IssueStatus,
  ) {
    return this.issueService.updateReturnStatus(issueId, status);
  }

  // Admin: Get all issues
  @Get()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  getAllIssues() {
    return this.issueService.getAllIssues();
  }
}
