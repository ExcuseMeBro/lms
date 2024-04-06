import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CreateEducenterDto } from './dto/create-educenter.dto';
import { UpdateEducenterDto } from './dto/update-educenter.dto';
import { EducentersService } from './educenters.service';
import { Educenter } from './entities/educenter.entity';
import { Role } from 'src/common/enums/role.enum';
import { Roles } from 'src/common/decorators/roles.decorator';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { ActiveUser } from 'src/common/decorators/active-user.decorator';

@ApiTags('educenters')
@UseGuards(RolesGuard)
@Controller('educenters')
export class EducentersController {
  constructor(private readonly educentersService: EducentersService) {}

  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiOkResponse({ description: 'Create Educenter', type: Educenter })
  @HttpCode(HttpStatus.CREATED)
  @ApiBearerAuth()
  @Post()
  create(@Body() createEducenterDto: CreateEducenterDto) {
    return this.educentersService.create(createEducenterDto);
  }

  @ApiBearerAuth()
  @Get()
  @Roles(Role.TechAdmin, Role.Owner)
  findAll(@ActiveUser('id') id) {
    return this.educentersService.findAll(id);
  }

  @ApiBearerAuth()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.educentersService.findOne(id);
  }

  @ApiBearerAuth()
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEducenterDto: UpdateEducenterDto,
  ) {
    return this.educentersService.update(id, updateEducenterDto);
  }

  @ApiBearerAuth()
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.educentersService.remove(id);
  }
}
