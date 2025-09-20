import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
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
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
