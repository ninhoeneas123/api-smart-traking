import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UsersService } from './users/users.service'
import { UsersController } from './users/users.controller';


@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }),
  MongooseModule.forRootAsync({
    useFactory: async (configService: ConfigService) => {
      const uri = configService.get<string>('DB_URL');
      if (!uri)
        throw Error(
          'The database connection URL has not been configured.',
        );
      return {
        uri,
      };
    },
    inject: [ConfigService, UsersService],
  }),
    AuthModule,
    UsersModule
  ],
  controllers: [],
  providers: [UsersController],
})
export class AppModule { }
