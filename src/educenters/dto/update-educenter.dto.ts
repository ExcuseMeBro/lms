import { PartialType } from '@nestjs/swagger';
import { CreateEducenterDto } from './create-educenter.dto';

export class UpdateEducenterDto extends PartialType(CreateEducenterDto) {}
