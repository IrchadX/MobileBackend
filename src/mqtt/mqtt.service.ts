import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';
@Injectable()
export class MqttService implements OnModuleInit {
  constructor(
    @Inject('MQTT_CLIENT') private readonly client: ClientProxy,
  ) {}

  async onModuleInit() {
    await this.client.connect();
  }

  publish(topic: string, payload: any) {
    return this.client.emit(topic, payload);
  }

  subscribe(topic: string): Observable<any> {
    return this.client.send(topic, {});
  }
}