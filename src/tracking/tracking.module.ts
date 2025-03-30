import { Module, forwardRef } from '@nestjs/common';
import { TrackingService } from './tracking.service';
import { MqttModule } from '../mqtt/mqtt.module';

@Module({
  imports: [forwardRef(() => MqttModule)], 
  providers: [TrackingService],
  exports: [TrackingService],
})
export class TrackingModule {}
