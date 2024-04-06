import { ApiHideProperty } from '@nestjs/swagger';
import { Group } from 'src/groups/entities/group.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'teachers',
})
export class Teacher {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fistname: string;

  @Column()
  lastname: string;

  @OneToMany(() => Group, (group) => group.teacher)
  groups: Group[];

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @ApiHideProperty()
  @Column()
  deleted: boolean;
}
