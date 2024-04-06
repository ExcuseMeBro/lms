import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Attendance } from 'src/attendance/entities/attendance.entity';
import { Group } from 'src/groups/entities/group.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'students',
})
export class Student {
  @ApiProperty({
    description: 'ID of student',
    example: '89c018cc-8a77-4dbd-94e1-dbaa710a2a9c',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  fistname: string;

  @Column()
  lastname: string;

  @ApiProperty({ description: 'Phone of student', example: '+9989012334567' })
  @Column({ unique: true })
  phone: string;

  @OneToMany(() => Group, (group) => group.student)
  groups: Group[];

  @OneToMany(() => Attendance, (attendance) => attendance.student)
  attendances: Attendance[];

  @ApiProperty({ description: 'Created date of student' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: 'Updated date of student' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ApiHideProperty()
  @Column('boolean', { default: false })
  deleted: boolean;
}
