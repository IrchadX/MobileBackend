// src/tracking/tracking.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { TrackingService } from './tracking.service';

@Controller('tracking')
export class TrackingController {
  constructor(private readonly trackingService: TrackingService) {}

  @Post('update')
  updatePosition(@Body() position: any) {
    return this.trackingService.updatePosition(position);
  }

  @Get('current')
  getCurrentPosition() {
    return this.trackingService.getCurrentPosition();
  }
}