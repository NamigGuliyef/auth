import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateAuthDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @IsOptional()
  @IsString()
  old_pass: string;
  @IsOptional()
  @IsString()
  new_pass: string;
}
