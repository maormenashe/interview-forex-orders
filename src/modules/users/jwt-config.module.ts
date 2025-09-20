import { Global, Module } from '@nestjs/common';
import { JwtConfigService } from 'src/config/jwt-config.service';

@Global()
@Module({
  providers: [JwtConfigService],
  exports: [JwtConfigService],
})
export class JwtConfigModule {}
