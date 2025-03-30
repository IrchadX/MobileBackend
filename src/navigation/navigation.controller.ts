// src/navigation/navigation.controller.ts
import { Controller, Get, Query, Post, Body } from '@nestjs/common';
import { PathfindingService } from './pathfinding.service';

@Controller('navigation')
export class NavigationController {
  constructor(private readonly pathfindingService: PathfindingService) {}

  @Get('route')
  async getRoute(
    @Query('start') start: string,
    @Query('end') end: string,
  ) {
    try {
      const [startLng, startLat] = start.split(',').map(parseFloat);
      const [endLng, endLat] = end.split(',').map(parseFloat);
      
      return await this.pathfindingService.findPath(
        [startLng, startLat], 
        [endLng, endLat]
      );
    } catch (e) {
      return { error: e.message };
    }
  }

  @Post('route-to')
  async routeToDestination(
    @Body('destination') destination: string,
    @Body('useCurrentPosition') useCurrentPosition: boolean = true
  ) {
    return this.pathfindingService.routeTo(destination, useCurrentPosition);
  }

  @Get('nearest-poi')
  async getNearestPOI(
    @Query('lng') lng: number,
    @Query('lat') lat: number,
    @Query('type') type?: string
  ) {
    return this.pathfindingService.findNearestPOI([lng, lat], type);
  }
}