import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { LoginUserDto } from './dto/login-user.dto';
import { RegisterUserDto } from './dto/register-user.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<UserDocument>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterUserDto): Promise<{ token: string }> {
    const existing = await this.userModel.findOne({ email: dto.email });
    if (existing) throw new BadRequestException('Email already exists');

    const hash = await bcrypt.hash(dto.password, 10);
    const user = await this.userModel.create({ ...dto, password: hash });
    const token = this.jwtService.sign({ sub: user._id, email: user.email });
    return { token };
  }

  async login(dto: LoginUserDto): Promise<{ token: string }> {
    const user = await this.userModel.findOne({ email: dto.email });
    if (!user) throw new UnauthorizedException('Invalid credentials');

    const isMatch = await bcrypt.compare(dto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Invalid credentials');

    const payload: JwtPayload = {
      sub: user._id.toString(),
      email: user.email,
    };

    const token = this.jwtService.sign(payload);

    return { token };
  }

  async getUserInfo(userId: string): Promise<User | null> {
    return this.userModel.findById(userId).select('-password').lean();
  }
}
