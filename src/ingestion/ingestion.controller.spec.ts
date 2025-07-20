import { Controller, Post, Get, UseGuards } from '@nestjs/common';
import { IngestionService } from './ingestion.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';

@Controller('ingestion')
export class IngestionController {
  constructor(private readonly ingestionService: IngestionService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('editor')
  @Post('start')
  start() {
    return { message: this.ingestionService.startIngestion() };
  }

  @UseGuards(JwtAuthGuard)
  @Get('status')
  status() {
    return { status: this.ingestionService.getStatus() };
  }
}