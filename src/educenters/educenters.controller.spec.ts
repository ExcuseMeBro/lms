import { Test, TestingModule } from '@nestjs/testing';
import { EducentersController } from './educenters.controller';
import { EducentersService } from './educenters.service';

describe('EducentersController', () => {
  let controller: EducentersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EducentersController],
      providers: [EducentersService],
    }).compile();

    controller = module.get<EducentersController>(EducentersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
