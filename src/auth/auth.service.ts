import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserAuth } from './schema/user-auth.schema';
import { CreateAuthDto } from './dto/create-auth.dto';
import { hashPassword } from 'src/helpers/hashpass';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserAuth.name) private readonly userModel: Model<UserAuth>,
  ) {}

  async signUp(signupData: CreateAuthDto): Promise<UserAuth> {
    const { email, password } = signupData;

    // emailin olub olmadığını yoxla
    const existEmail = await this.userModel.findOne({ email });
    if (existEmail)
      throw new BadRequestException('Email artiq istifade olunub!');
    const hashPass = await hashPassword(password);
    return await this.userModel.create({ ...signupData, password: hashPass });
  }
}
