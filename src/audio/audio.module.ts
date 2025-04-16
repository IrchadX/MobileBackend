import { Module } from '@nestjs/common';
import { AudioController } from './audio.controller';
import { AudioService } from './audio.service';
import { MqttModule } from '../mqtt/mqtt.module';
//import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [MqttModule ],
  controllers: [AudioController],
  providers: [AudioService],
  exports: [AudioService],
})
export class AudioModule {}