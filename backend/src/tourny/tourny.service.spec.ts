import { Test, TestingModule } from '@nestjs/testing';
import { TournyService } from './tourny.service';

describe('TournyService', () => {
  let service: TournyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TournyService],
    }).compile();

    service = module.get<TournyService>(TournyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
