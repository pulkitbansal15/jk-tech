import { IngestionService } from '../ingestion/ingestion.service';

describe('IngestionService', () => {
  let service: IngestionService;

  beforeEach(() => {
    service = new IngestionService();
  });

  it('should start ingestion', () => {
    const msg = service.startIngestion();
    expect(msg).toBe('Ingestion started');
    expect(service.getStatus()).toBe('Ingestion in progress');
  });

  it('should return idle if not started', () => {
    expect(service.getStatus()).toBe('Idle');
  });
});