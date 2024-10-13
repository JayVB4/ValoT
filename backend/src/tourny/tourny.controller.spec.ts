import { Test, TestingModule } from '@nestjs/testing';
import { TournyController } from './tourny.controller';

describe('TournyController', () => {
  let controller: TournyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TournyController],
    }).compile();

    controller = module.get<TournyController>(TournyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
