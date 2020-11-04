import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity('user')
export class User {

  @PrimaryGeneratedColumn()
  id: number;


  @ApiProperty({
    type: String,
    description: 'unique email',
    required: true,
    nullable: false,
  })
  @Column({ nullable: false, unique: true })
  email: string;


  @ApiProperty({
    type: String,
    description: 'password',
    required: true,
    nullable: false,
  })
  @Column({ nullable: false })
  password: string;
}