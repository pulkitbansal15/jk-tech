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
    // starts the ingestion process
    return { message: this.ingestionService.startIngestion() };
  }

  @UseGuards(JwtAuthGuard)
  @Get('status')
  status() {
    // give the status of ingestion process
    // will return Ingestion in progress if the ingestion is started and
    // return Idle if the process is not started 
    return { status: this.ingestionService.getStatus() };
  }
}