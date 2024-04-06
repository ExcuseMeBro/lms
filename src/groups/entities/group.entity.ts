import { ApiHideProperty } from '@nestjs/swagger';
import { Direction } from 'src/directions/entities/direction.entity';
import { Student } from 'src/students/entities/student.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'groups',
})
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @OneToOne(() => Direction)
  @JoinColumn()
  direction: Direction;

  @ManyToOne(() => Teacher, (teacher) => teacher.groups)
  teacher: Teacher;

  @ManyToOne(() => Student, (student) => student.groups)
  student: Student;

  @CreateDateColumn()
  created_at: Date;

  @CreateDateColumn()
  updated_at: Date;

  @Column()
  archive: boolean;

  @ApiHideProperty()
  @Column('boolean', { default: false })
  deleted: boolean;
}
