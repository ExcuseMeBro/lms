import { ApiHideProperty } from '@nestjs/swagger';
import { Direction } from 'src/directions/entities/direction.entity';
import { Educenter } from 'src/educenters/entities/educenter.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'branches',
})
export class Branch {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @OneToMany(() => Direction, (direction) => direction.educenter)
  directions: Direction[];

  @ManyToOne(() => Educenter, (educenter) => educenter.branches)
  educenter: Educenter;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @ApiHideProperty()
  @Column('boolean', { default: false })
  deleted: boolean;
}
