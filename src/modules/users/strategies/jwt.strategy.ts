import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { JwtConfigService } from 'src/config/jwt-config.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { UsersService } from '../users.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private jwtConfig: JwtConfigService,
    private usersService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConfig.secret,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.usersService.getUserInfo(payload.sub);

    if (!user) {
      throw new UnauthorizedException('User not found or inactive');
    }

    return user;
  }
}
