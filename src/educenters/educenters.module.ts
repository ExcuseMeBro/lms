import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EducentersController } from './educenters.controller';
import { EducentersService } from './educenters.service';
import { Educenter } from './entities/educenter.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Educenter])],
  controllers: [EducentersController],
  providers: [EducentersService],
})
export class EducentersModule {}
