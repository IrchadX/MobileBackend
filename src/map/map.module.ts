// src/map/map.module.ts
import { Module } from '@nestjs/common';
import { MapService } from './map.service';
import { MapController } from './map.controller';

@Module({
  controllers: [MapController],
  providers: [MapService],
  exports: [MapService] // Export if other modules need to use MapService
})
export class MapModule {}