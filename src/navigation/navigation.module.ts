// src/navigation/navigation.module.ts
import { Module } from '@nestjs/common';
import { PathfindingService } from './pathfinding.service';
import { NavigationController } from './navigation.controller';
import { MapModule } from '../map/map.module';
import { TrackingModule } from '../tracking/tracking.module';

@Module({
  imports: [MapModule, TrackingModule], // Import dependencies
  controllers: [NavigationController],
  providers: [PathfindingService],
  exports: [PathfindingService] // Export if other modules need pathfinding
})
export class NavigationModule {}