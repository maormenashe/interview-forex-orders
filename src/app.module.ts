import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import jwtConfig from './config/jwt.config';
import { JwtConfigModule } from './modules/users/jwt-config.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [jwtConfig],
    }),
    JwtConfigModule,
    MongooseModule.forRoot('mongodb://localhost:27017/forex-orders', {
      connectionFactory: (connection: Connection) => {
        const logger = new Logger('Mongoose');

        connection.once('open', () => logger.log('MongoDB connected'));
        connection.on('error', (err) =>
          logger.error(`MongoDB connection error: ${err}`),
        );
        connection.on('disconnected', () =>
          logger.warn('MongoDB disconnected'),
        );

        return connection;
      },
    }),
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
