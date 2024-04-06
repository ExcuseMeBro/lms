import { Module } from '@nestjs/common';
import { DirectionsService } from './directions.service';
import { DirectionsController } from './directions.controller';
import { Direction } from './entities/direction.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Direction])],
  controllers: [DirectionsController],
  providers: [DirectionsService],
})
export class DirectionsModule {}
