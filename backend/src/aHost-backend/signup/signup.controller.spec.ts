import { Test, TestingModule } from '@nestjs/testing';
import { HostSignupController } from './signup.controller';

describe('HostSignupController', () => {
  let controller: HostSignupController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HostSignupController],
    }).compile();

    controller = module.get<HostSignupController>(HostSignupController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
