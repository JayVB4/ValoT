import { Test, TestingModule } from '@nestjs/testing';
import { RegTeamsService } from './reg-teams.service';

describe('RegTeamsService', () => {
  let service: RegTeamsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegTeamsService],
    }).compile();

    service = module.get<RegTeamsService>(RegTeamsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
