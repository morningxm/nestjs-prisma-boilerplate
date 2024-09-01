import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { ENV } from '@/enum/env.enum';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const host = configService.get(ENV.MONGODB_HOST);
        const port = configService.get(ENV.MONGODB_PORT);
        const name = configService.get(ENV.MONGODB_NAME);

        return {
          uri: `mongodb://${host}:${port}/${name}`,
          connectionFactory: (connection) => {
            if (connection.readyState == 1) {
              console.log(`Connected to ${name} at ${host}:${port}`);
            }

            return connection;
          },
        };
      },
    }),
  ],
})
export class DatabaseModule {}
