// src/app.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AidantModule } from './aidant/aidant.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // This makes ConfigModule available globally
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    AidantModule,
    AidantModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
