import { Controller, Post, UseGuards, UseInterceptors, UploadedFile, Body, Get, Delete, Param, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { DocumentsService } from './documents.service';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('editor')
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File, @Body('title') title: string, @Req() req) {
    return this.documentsService.upload(title, file.path, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    return this.documentsService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('editor')
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.documentsService.remove(id);
  }
}