import { Injectable } from '@nestjs/common';

@Injectable()
export class IngestionService {
  private isRunning = false;

  startIngestion(): string {
    this.isRunning = true;
    setTimeout(() => {
      this.isRunning = false;
    }, 3000);
    return 'Ingestion started';
  }

  getStatus(): string {
    return this.isRunning ? 'Ingestion in progress' : 'Idle';
  }
}