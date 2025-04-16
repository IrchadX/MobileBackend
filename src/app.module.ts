import { Module } from '@nestjs/common';
import { AudioModule } from './audio/audio.module';
import { MqttModule } from './mqtt/mqtt.module';

@Module({
  imports: [AudioModule, MqttModule]
})
export class AppModule {}