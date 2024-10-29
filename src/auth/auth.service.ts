import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { comparePassword, hashPassword } from 'src/helpers/hashpass';
import { v4 as uuidv4 } from 'uuid';
import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginDTO } from './dto/login.dto';
import { RefreshToken } from './schema/refresh-token.schema';
import { UserAuth } from './schema/user-auth.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(UserAuth.name) private readonly userModel: Model<UserAuth>,
    @InjectModel(RefreshToken.name)
    private readonly RefreshTokenModel: Model<RefreshToken>,

    private jwtService: JwtService,
  ) {}

  async signUp(signupData: CreateAuthDto): Promise<string> {
    const { email, password } = signupData;

    // emailin olub olmadığını yoxla
    const existEmail = await this.userModel.findOne({ email });
    if (existEmail)
      throw new BadRequestException('Email artiq istifade olunub!');
    const hashPass = await hashPassword(password);
    await this.userModel.create({ ...signupData, password: hashPass });
    return 'Qeydiyyat tamamlandı...';
  }

  async login(loginData: LoginDTO) {
    const user = await this.userModel.findOne({ email: loginData.email });
    if (!user) throw new UnauthorizedException('Email yalnışdır!');
    const passwordRight = await comparePassword(
      loginData.password,
      user.password,
    );
    if (!passwordRight) throw new UnauthorizedException('Şifrə yalnışdır!');
    const accessToken = this.jwtService.sign(
      { email: loginData.email },
      { expiresIn: 2 },
    );
    const refreshToken = uuidv4();
    // refresh token DB -da saxla
    const expiryDate = new Date();
    console.log(expiryDate);

    expiryDate.setDate(expiryDate.getDate() + 3);
    console.log(expiryDate);

    const a = await this.RefreshTokenModel.create({
      token: refreshToken,
      userId: user._id,
      expiryDate: expiryDate,
    });
    console.log(a);

    return { accessToken, refreshToken };
  }
}
