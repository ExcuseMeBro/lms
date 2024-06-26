import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Teacher } from './entities/teacher.entity';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';

@Module({
  imports: [TypeOrmModule.forFeature([Teacher])],
  controllers: [TeacherController],
  providers: [TeacherService],
})
export class TeacherModule {}
