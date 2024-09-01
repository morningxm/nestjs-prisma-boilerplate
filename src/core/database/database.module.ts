import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { envConfig } from '@/config/env.config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => {
        const host = envConfig.DATABASE_HOST;
        const port = envConfig.DATABASE_PORT;
        const name = envConfig.DATABASE_NAME;
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
