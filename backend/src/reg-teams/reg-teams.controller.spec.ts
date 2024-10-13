import { Test, TestingModule } from '@nestjs/testing';
import { RegTeamsController } from './reg-teams.controller';

describe('RegTeamsController', () => {
  let controller: RegTeamsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegTeamsController],
    }).compile();

    controller = module.get<RegTeamsController>(RegTeamsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
