import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';

export class RegisterUserDto {
  @ApiProperty() @IsEmail() email: string;
  @ApiProperty() @IsString() @MinLength(6) @MaxLength(50) password: string;
  @ApiProperty({ required: false }) @IsString() name?: string;
}
