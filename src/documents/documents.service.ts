import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './document.entity';
import { User } from '../users/user.entity';

@Injectable()
export class DocumentsService {
  constructor(@InjectRepository(Document) private repo: Repository<Document>) { }

  async upload(title: string, path: string, user: User): Promise<Document> {
    try {
      const doc: Document = this.repo.create({
        title,
        filePath: path,
        uploadedBy: { id: user?.['userId'] },
      });
      return await this.repo.save(doc);
    } catch (e) {
      console.error('Upload failed:', e);
      throw e;
    }
  }

  async findAll(): Promise<Document[]> {
    return this.repo.find({ relations: ['uploadedBy'] });
  }

  async remove(id: number): Promise<void> {
    await this.repo.delete(id);
  }
}