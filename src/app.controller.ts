import { Controller, Get } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection, ConnectionStates } from 'mongoose';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @InjectConnection() private readonly mongoConnection: Connection,
  ) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('mongo-test')
  async testMongo(): Promise<string> {
    const isConnected =
      this.mongoConnection.readyState === ConnectionStates.connected;

    if (!this.mongoConnection.db) {
      return 'Mongo connection is not initialized.';
    }

    const collections = await this.mongoConnection.db
      .listCollections()
      .toArray();

    const collectionNames =
      collections.map((c) => c.name).join(', ') || 'No collections yet';

    return `Mongo connected? ${isConnected}. Collections: ${collectionNames}`;
  }
}
