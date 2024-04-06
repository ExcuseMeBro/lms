import { Test, TestingModule } from '@nestjs/testing';
import { EducentersService } from './educenters.service';

describe('EducentersService', () => {
  let service: EducentersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EducentersService],
    }).compile();

    service = module.get<EducentersService>(EducentersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
