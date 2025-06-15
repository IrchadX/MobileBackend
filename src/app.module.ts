import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AudioModule } from './audio/audio.module';
import { MqttModule } from './mqtt/mqtt.module';
import { ProfilModule } from './Functions/Profil/profil.module';
import { DeviceModule } from './Functions/Device/device.module';
import { AuthModule } from './Functions/auth/auth.module';
import { AidantModule } from './Functions/aidant/aidant.module';
import { LocationModule } from './Functions/location/location.module';
import { AppelModule } from './Functions/appel/appel.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    PrismaModule,
    UsersModule,
    AuthModule,
    AidantModule,
    AppelModule,
    ProfilModule,
    DeviceModule,
    LocationModule,
    AudioModule,
    MqttModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
