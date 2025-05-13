/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
import { Body, Controller, Post } from '@nestjs/common';
import { LocationService } from './location.service';
import { IsString } from 'class-validator';

export class LocationDto {
  @IsString()
  userId: string;
  @IsString()
  longitude: string;
  
  @IsString()
  latitude: string;
}

@Controller('')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  // Endpoint for periodic updates
  @Post('location/update')
  async updateLocation(
    @Body() location : LocationDto
  ) {
    await this.locationService.saveLocation(location.userId, location.latitude, location.longitude);
    return { data: 'Location updated successfully' };
  }

  // Endpoint for real-time sharing
 /* @Post('share')
  async shareLocation(
    @Body() body: { userId: string; latitude: number; longitude: number }
  ) {
    await this.locationService.shareLocation(body.userId, body.latitude, body.longitude);
    return { message: 'Location shared successfully' };
  }*/
}