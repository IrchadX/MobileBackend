import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppelModule } from './Functions/appel/appel.module';

@Module({
  imports: [ConfigModule.forRoot(), AppelModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
