import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Educenter } from 'src/educenters/entities/educenter.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'directions',
})
export class Direction {
  @ApiProperty({
    description: 'ID of direction',
    example: '89c018cc-8a77-4dbd-94e1-dbaa710a2a9c',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({
    description: 'Name of directions',
    example: 'Web development',
  })
  @Column({ unique: true })
  name: string;

  @ManyToOne(() => Educenter, (educenter) => educenter.directions)
  educenter: Educenter;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @ApiHideProperty()
  @Column('boolean', { default: false })
  deleted: boolean;
}
