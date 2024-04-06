import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PsqlErrorCode } from 'src/common/enums/error-codes.enum';
import { Repository } from 'typeorm';
import { CreateEducenterDto } from './dto/create-educenter.dto';
import { UpdateEducenterDto } from './dto/update-educenter.dto';
import { Educenter } from './entities/educenter.entity';

@Injectable()
export class EducentersService {
  constructor(
    @InjectRepository(Educenter)
    private readonly eduCenterRepository: Repository<Educenter>,
  ) {}
  async create(createEducenterDto: CreateEducenterDto) {
    const { name, address } = createEducenterDto;
    try {
      const educenter = new Educenter();
      educenter.name = name;
      educenter.address = address;
      await this.eduCenterRepository.save(educenter);
    } catch (error) {
      if (error.code === PsqlErrorCode.UniqueViolation) {
        throw new ConflictException(`Education center [${name}] already exist`);
      }
      throw error;
    }
  }

  async findAll(id: string) {
    try {
      return await this.eduCenterRepository.find({
        where: { user: { id: id } },
      });
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      return (
        (await this.eduCenterRepository.findOne({ where: { id: id } })) ?? []
      );
    } catch (error) {
      return error.message;
    }
  }

  async update(id: string, updateEducenterDto: UpdateEducenterDto) {
    const { name, address } = updateEducenterDto;
    try {
      const educenter = new Educenter();
      educenter.name = name;
      educenter.address = address;
      await this.eduCenterRepository.update(id, educenter);
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const educenter = await this.findOne(id);
      if (educenter) {
        return new NotFoundException('Educenter not found!').message;
      } else {
        return await this.eduCenterRepository.remove(educenter);
      }
    } catch (error) {
      return error.message;
    }
  }
}
