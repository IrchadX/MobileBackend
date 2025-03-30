import { Injectable, OnModuleInit, Inject, forwardRef } from '@nestjs/common';
import { MqttClient, connect } from 'mqtt';
import { TrackingService } from '../tracking/tracking.service';

@Injectable()
export class MqttService implements OnModuleInit {
  private client: MqttClient;

  constructor(@Inject(forwardRef(() => TrackingService)) private readonly trackingService: TrackingService) {}

  onModuleInit() {
    this.client = connect('mqtt://localhost:1883');


    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
      this.client.subscribe('indoor-navigation/position', (err) => {
        if (!err) console.log('Subscribed to position updates');
      });
    });

    this.client.on('message', (topic, message) => {
      if (topic === 'indoor-navigation/position') {
        try {
          const position = JSON.parse(message.toString());
          this.trackingService.updatePosition(position);
        } catch (e) {
          console.error('Error processing MQTT message:', e);
        }
      }
    });

    this.client.on('error', (err) => {
      console.error('MQTT error:', err);
    });
  }

  publish(topic: string, message: string) {
    this.client.publish(topic, message);
  }
}
