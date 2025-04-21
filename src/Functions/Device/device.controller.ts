/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
// src/example/example.controller.ts
import { Controller, Get, Param } from '@nestjs/common';
import { DeviceService } from './device.service';

@Controller('')
export class DeviceController {
  constructor(private readonly exampleService: DeviceService) {}

  @Get('api/getDeviceInfo/:id') // Accepts 'id' as a parameter
  async getDeviceData(@Param('id') userId: string) {
    const data = await this.exampleService.getDataDevice(userId);
    return data;
  }

}