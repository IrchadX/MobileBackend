import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MqttService } from './mqtt.service';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: 'MQTT_CLIENT',
        imports: [ConfigModule],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.MQTT,
          options: {
            url: configService.get<string>('MQTT_BROKER_URL'),
            username: configService.get<string>('MQTT_USERNAME'),
            password: configService.get<string>('MQTT_PASSWORD'),
            reconnectPeriod: 5000,
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [MqttService],
  exports: [MqttService],
})
export class MqttModule {}