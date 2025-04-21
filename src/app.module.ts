import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AppelModule } from './Functions/appel/appel.module';
import { ProfilModule } from './Functions/Profil/profil.module';
import { DeviceModule } from './Functions/Device/device.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AppModule,
    AppelModule,
    ProfilModule,
    DeviceModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
