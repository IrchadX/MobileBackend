import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { Inject } from '@nestjs/common';
// Ajoutez ces importations
import { Buffer } from 'buffer';
//import { PrismaService } from '../prisma/prisma.service';  
@Injectable()
export class AudioService {
  constructor(
    @Inject('MQTT_SERVICE') private readonly mqttClient: ClientProxy,
  ) {}

  async forwardAudio(audioBuffer: Buffer): Promise<void> {
    // Envoyer directement l'audio au Raspberry Pi via MQTT
    this.mqttClient.emit('audio/raw', { 
      audio: audioBuffer.toString('base64'),
      timestamp: new Date().toISOString(),
     
    });
  }
}