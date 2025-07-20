import { Controller, Post, UseGuards, UseInterceptors, UploadedFile, Body, Get, Delete, Param, Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';
import { DocumentsService } from './documents.service';
import { diskStorage } from 'multer';
import { extname } from 'path';

@Controller('documents')
export class DocumentsController {
  constructor(private readonly documentsService: DocumentsService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('editor')
  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {//saave the file in uploads folder, we can also save the file in s3 bucket if we implement AWS
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
        const ext = extname(file.originalname);
        callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
      },
    }),
  }))
  async upload(@UploadedFile() file: Express.Multer.File, @Body('title') title: string, @Req() req) {
    //saves the file's and user's details in db, the original file is saved in uploads folder
    return this.documentsService.upload(title, file.path, req.user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getAll() {
    // get all the uploaded documents
    return this.documentsService.findAll();
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('editor')
  @Delete(':id')
  async delete(@Param('id') id: number) {
    //delete a document by its id
    return this.documentsService.remove(id);
  }
}