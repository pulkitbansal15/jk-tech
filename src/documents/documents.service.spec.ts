import { Test, TestingModule } from '@nestjs/testing';
import { DocumentsService } from '../documents/documents.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Document } from '../documents/document.entity';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';

describe('DocumentsService', () => {
  let service: DocumentsService;
  let repo: Repository<Document>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DocumentsService,
        {
          provide: getRepositoryToken(Document),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<DocumentsService>(DocumentsService);
    repo = module.get<Repository<Document>>(getRepositoryToken(Document));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call repo.save on upload', async () => {
    const saveSpy = jest.spyOn(repo, 'save').mockResolvedValue({} as any);
    await service.upload('Test', 'path/to/file', { id: 1 } as User);
    expect(saveSpy).toHaveBeenCalled();
  });

  it('should call repo.find on findAll', async () => {
    const findSpy = jest.spyOn(repo, 'find').mockResolvedValue([]);
    await service.findAll();
    expect(findSpy).toHaveBeenCalled();
  });

  it('should call repo.delete on remove', async () => {
    const deleteSpy = jest.spyOn(repo, 'delete').mockResolvedValue({} as any);
    await service.remove(1);
    expect(deleteSpy).toHaveBeenCalledWith(1);
  });
});