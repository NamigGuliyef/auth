import { IsEmail, IsIn, IsNotEmpty, IsString } from 'class-validator';
import { userTypes } from '../schema/user-auth.schema';

export class CreateAuthDto {
  @IsNotEmpty()
  @IsString()
  name: string;
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;
  @IsNotEmpty()
  @IsString()
  password: string;
  @IsNotEmpty()
  @IsString()
  @IsIn([userTypes.USER, userTypes.ADMIN])
  role: string;
}
