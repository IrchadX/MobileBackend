import { Injectable } from '@nestjs/common';
import { Buffer } from 'buffer';
import { MqttService } from '../mqtt/mqtt.service';

@Injectable()
export class AudioService {
  constructor(
    private readonly mqttService: MqttService,
  ) {}

  async forwardAudio(audioBuffer: Buffer): Promise<void> {
    // Envoyer directement l'audio au Raspberry Pi via MQTT
    this.mqttService.publish('audio/raw', { 
      audio: audioBuffer.toString('base64'),
      timestamp: new Date().toISOString(),
    });
  }
}