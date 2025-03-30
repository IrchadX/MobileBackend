// src/map/map.controller.ts
import { Controller, Get, Query } from '@nestjs/common';
import { MapService } from './map.service';

@Controller('map')
export class MapController {
  constructor(private readonly mapService: MapService) {}

  @Get('data')
  getMapData() {
    return this.mapService.getMapData();
  }

  @Get('zone')
  getZoneByName(@Query('name') name: string) {
    return this.mapService.findZoneByName(name);
  }

  @Get('pois')
  getPOIs() {
    return this.mapService.getPOIs();
  }

  @Get('environment')
  getEnvironment() {
    return this.mapService.getEnvironment();
  }
}