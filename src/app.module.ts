import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AudioModule } from './audio/audio.module';
import { MqttModule } from './mqtt/mqtt.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    AudioModule, 
    MqttModule
  ]
})
export class AppModule {}