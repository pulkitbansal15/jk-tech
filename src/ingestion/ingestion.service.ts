import { Injectable } from '@nestjs/common';

@Injectable()
export class IngestionService {
  private isRunning = false;

  startIngestion(): string {
    // moking an ingestion process for 10 seconds
    this.isRunning = true;
    setTimeout(() => {
      this.isRunning = false;
    }, 10000);
    return 'Ingestion started';
  }

  getStatus(): string {
    return this.isRunning ? 'Ingestion in progress' : 'Idle';
  }
}