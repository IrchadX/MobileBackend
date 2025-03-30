import { Module, forwardRef } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MqttService } from './mqtt.service';
import { TrackingModule } from '../tracking/tracking.module';

@Module({
  imports: [
    forwardRef(() => TrackingModule), // Prevent circular dependency
    ClientsModule.register([
      {
        name: 'MQTT_SERVICE',
        transport: Transport.MQTT,
        options: {
          url: 'mqtt://localhost:1883',
        },
      },
    ]),
  ],
  providers: [MqttService],
  exports: [MqttService],
})
export class MqttModule {}
