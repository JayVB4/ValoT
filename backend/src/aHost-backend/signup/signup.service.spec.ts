import { Test, TestingModule } from '@nestjs/testing';
import { HostSignupService } from './signup.service';

describe('HostSignupService', () => {
  let service: HostSignupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HostSignupService],
    }).compile();

    service = module.get<HostSignupService>(HostSignupService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
