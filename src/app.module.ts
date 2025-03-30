// src/app.module.ts (updated)
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MapModule } from './map/map.module';
import { MqttModule } from './mqtt/mqtt.module';
import { NavigationModule } from './navigation/navigation.module';
import { TrackingModule } from './tracking/tracking.module';

@Module({
  imports: [
    MapModule,
    MqttModule,
    NavigationModule,
    TrackingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
