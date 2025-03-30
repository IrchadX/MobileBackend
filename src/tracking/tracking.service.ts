import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { MqttService } from '../mqtt/mqtt.service';

@Injectable()
export class TrackingService {
  private currentPosition: any = null;

  constructor(@Inject(forwardRef(() => MqttService)) private readonly mqttService: MqttService) {}

  updatePosition(position: any) {
    this.currentPosition = position;

    // Optionally publish to other topics
    this.mqttService.publish(
      'indoor-navigation/position/updates',
      JSON.stringify(position)
    );

    return { success: true };
  }

  getCurrentPosition() {
    return this.currentPosition;
  }
}
