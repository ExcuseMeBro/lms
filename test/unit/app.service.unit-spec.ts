import { Test, TestingModule } from '@nestjs/testing';

import { AppService } from '../../src/app.service';

describe('AppService', () => {
  let service: AppService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [AppService],
    }).compile();

    service = moduleRef.get<AppService>(AppService);
  });

  describe('getHealthCheck', () => {
    it('should return "Hello World!"', () => {
      const result = service.getHealthCheck();

      expect(result).toEqual('Ok!');
    });
  });
});
