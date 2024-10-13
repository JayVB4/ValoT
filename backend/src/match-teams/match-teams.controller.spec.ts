import { Test, TestingModule } from '@nestjs/testing';
import { MatchTeamsController } from './match-teams.controller';

describe('MatchTeamsController', () => {
  let controller: MatchTeamsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MatchTeamsController],
    }).compile();

    controller = module.get<MatchTeamsController>(MatchTeamsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
