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
import { JwtAuthGuard } from '../guards/jwt-auth.guard';
import { RolesGuard } from '../guards/roles.guard';
import { Roles } from '../guards/roles.decorator';
import { UserRole } from '../entities/user.entity';
import { IssueStatus } from '../entities/issue.entity';
import { CustomRequest } from '../helpers/custom-request.interface';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
  ApiBearerAuth,
} from '@nestjs/swagger';

@ApiTags('Issues') // Grouping all issue-related APIs
@ApiBearerAuth() // Add authentication support in Swagger
@Controller('issues')
export class IssuesController {
  constructor(private issueService: IssuesService) {}

  // Member: Request to issue a book
  @Post('request')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.MEMBER)
  @ApiOperation({ summary: 'Request to issue a book (Member only)' })
  @ApiResponse({
    status: 201,
    description: 'Issue request created successfully',
  })
  @ApiResponse({ status: 404, description: 'User or book not found' })
  @ApiResponse({ status: 400, description: 'Book is already issued' })
  @ApiBody({ schema: { properties: { bookId: { type: 'number' } } } })
  requestIssue(@Body('bookId') bookId: number, @Req() req: CustomRequest) {
    return this.issueService.requestIssue(req.user, bookId);
  }

  // Admin: Approve or reject an issue request
  @Post(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Approve or reject an issue request (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Issue status updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Issue not found' })
  @ApiParam({ name: 'id', type: 'number', description: 'Issue ID' })
  @ApiBody({
    schema: {
      properties: {
        status: { type: 'string', enum: Object.values(IssueStatus) },
      },
    },
  })
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
  @ApiOperation({ summary: 'Request to return a book (Member only)' })
  @ApiResponse({
    status: 200,
    description: 'Return request submitted successfully',
  })
  @ApiResponse({ status: 404, description: 'Issue not found' })
  @ApiParam({ name: 'id', type: 'number', description: 'Issue ID' })
  requestReturn(@Param('id') issueId: number) {
    return this.issueService.requestReturn(issueId);
  }

  // Admin: Approve or reject a return request
  @Post(':id/return-status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Approve or reject a return request (Admin only)' })
  @ApiResponse({
    status: 200,
    description: 'Return status updated successfully',
  })
  @ApiResponse({ status: 404, description: 'Issue not found' })
  @ApiParam({ name: 'id', type: 'number', description: 'Issue ID' })
  @ApiBody({
    schema: {
      properties: {
        status: { type: 'string', enum: Object.values(IssueStatus) },
      },
    },
  })
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
  @ApiOperation({ summary: 'Get all issues (Admin only)' })
  @ApiResponse({ status: 200, description: 'List of all issues' })
  getAllIssues() {
    return this.issueService.getAllIssues();
  }
}
