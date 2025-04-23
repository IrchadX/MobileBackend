/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { DeviceService } from './device.service';
import { DeviceController } from './device.controller';

import { PrismaService } from '../../prisma/prisma.service';

@Module({
  providers: [DeviceService, PrismaService],
  controllers: [DeviceController],
})
export class DeviceModule {}
