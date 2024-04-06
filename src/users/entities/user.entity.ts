import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';
import { Role } from 'src/common/enums/role.enum';
import { Educenter } from 'src/educenters/entities/educenter.entity';
import { Teacher } from 'src/teacher/entities/teacher.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({
  name: 'users',
})
export class User {
  @ApiProperty({
    description: 'ID of user',
    example: '89c018cc-8a77-4dbd-94e1-dbaa710a2a9c',
  })
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ApiProperty({ description: 'Phone of user', example: '+9989012334567' })
  @Column({ unique: true })
  phone: string;

  @ApiHideProperty()
  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @ApiProperty({ description: 'Role of user' })
  @Column({ name: 'role', type: 'enum', enum: Role, default: Role.Teacher })
  role: Role;

  @OneToOne(() => Teacher)
  @JoinColumn()
  teacher: Teacher;

  @OneToMany(() => Educenter, (educenter) => educenter.user)
  educenter: Educenter[];

  @ApiProperty({ description: 'Created date of user' })
  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @ApiProperty({ description: 'Updated date of user' })
  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @ApiHideProperty()
  @Column('boolean', { default: false })
  deleted: boolean;
}
