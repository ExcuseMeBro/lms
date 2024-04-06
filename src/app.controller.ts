import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse } from '@nestjs/swagger';

import { AppService } from './app.service';
import { Public } from './common/decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOkResponse({ description: "Returns 'Ok!'" })
  @Public()
  @Get()
  getHealthCheck(): string {
    return this.appService.getHealthCheck();
  }
}
