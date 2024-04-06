import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Group } from 'src/groups/entities/group.entity';
import { Student } from 'src/students/entities/student.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'attendances',
})
export class Attendance {
  @ApiProperty({
    description: 'ID of Attendance',
    example: '89c018cc-8a77-4dbd-94e1-dbaa710a2a9c',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => Student, (student) => student.attendances)
  student: Student;

  @ApiProperty({ description: 'Created date of attendance' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiHideProperty()
  @Column('boolean', { default: false })
  deleted: boolean;
}
