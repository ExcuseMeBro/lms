import { ApiHideProperty } from '@nestjs/swagger';
import { Branch } from 'src/branches/entities/branch.entity';
import { Direction } from 'src/directions/entities/direction.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'educenters',
})
export class Educenter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  address: string;

  @OneToMany(() => Direction, (direction) => direction.educenter)
  directions: Direction[];

  @OneToMany(() => Branch, (branch) => branch.educenter)
  branches: Branch[];

  @ManyToOne(() => User, (user) => user.educenter)
  user: User;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @ApiHideProperty()
  @Column('boolean', { default: false })
  deleted: boolean;
}
