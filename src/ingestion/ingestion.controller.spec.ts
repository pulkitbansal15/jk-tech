import { Test, TestingModule } from '@nestjs/testing';
import { IngestionController } from './ingestion.controller';
import { IngestionService } from './ingestion.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

describe('IngestionController', () => {
  let controller: IngestionController;
  let service: IngestionService;

  beforeEach(async () => {
    const mockIngestionService = {
      startIngestion: jest.fn().mockReturnValue('Ingestion started'),
      getStatus: jest.fn().mockReturnValue('Idle'),
    };

    const mockGuard = {
      canActivate: jest.fn((context: ExecutionContext) => true),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [IngestionController],
      providers: [
        {
          provide: IngestionService,
          useValue: mockIngestionService,
        },
        Reflector,
      ],
    })
      .overrideGuard(JwtAuthGuard)
      .useValue(mockGuard)
      .overrideGuard(RolesGuard)
      .useValue(mockGuard)
      .compile();

    controller = module.get<IngestionController>(IngestionController);
    service = module.get<IngestionService>(IngestionService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return message from startIngestion', () => {
    const result = controller.start();
    expect(result).toEqual({ message: 'Ingestion started' });
    expect(service.startIngestion).toHaveBeenCalled();
  });

  it('should return status from getStatus', () => {
    const result = controller.status();
    expect(result).toEqual({ status: 'Idle' });
    expect(service.getStatus).toHaveBeenCalled();
  });
});
