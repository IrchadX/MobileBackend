/* eslint-disable prettier/prettier */
 
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
//import { MqttService } from '@nestjs/mqtt';

@Injectable()
export class LocationService {
  constructor(private prisma: PrismaService, 
    //private mqttService: MqttService

  ) {}

  // Save location to the database
  async saveLocation(userId: string, latitude: string, longitude: string) {
  const userIdInt = parseInt(userId, 10);
  await this.prisma.localisation.upsert({
    where: { userId: userIdInt },
    update: { latitude, longitude },
    create: {
      userId: userIdInt,
      latitude,
      longitude,
    },
  });
}
  // Publish location to MQTT broker
 /* async shareLocation(userId: string, latitude: number, longitude: number) {
    const payload = JSON.stringify({ userId, latitude, longitude, timestamp: new Date() });
    this.mqttService.publish(`user/${userId}/location`, payload);
  }*/
}