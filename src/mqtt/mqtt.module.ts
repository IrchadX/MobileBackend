import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MqttService } from './mqtt.service';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'MQTT_CLIENT',
        transport: Transport.MQTT,
        options: {
          url: process.env.MQTT_BROKER_URL,
          username: process.env.MQTT_USERNAME,
          password: process.env.MQTT_PASSWORD,
          reconnectPeriod: 5000,
        },
      },
    ]),
  ],
  providers: [MqttService],
  exports: [MqttService],
})
export class MqttModule {}