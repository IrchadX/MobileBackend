/* eslint-disable prettier/prettier */
 
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
 
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

type DeviceData = {
  type: string;
  state: string;
  mac_address: string;
  battery_capacity: number;
};

@Injectable()
export class DeviceService {
  constructor(private readonly prisma: PrismaService) {}

  // Function to get the device data
  async getDataDevice(userId: string): Promise<DeviceData | null> {
    try {
      const data = await this.prisma.device.findFirst({
        where: { user_id: parseInt(userId, 10) },
        select: {
          mac_address: true,
          type_id: true,
          connection_state: true,
          battery_capacity:true,
          device_type: {  
            select: {
              type: true, 
            },
          },
        },
      });

      if (!data) {
        console.error('User does not have a device');
        return null;
      }

      return {
        type: data.device_type.type,
        state: data.connection_state ? 'Connected' : 'Deconnected',
        mac_address: data.mac_address,
        battery_capacity : data.battery_capacity,
      };
    } catch (error) {
      console.error('Error in get DEVICE DATA:', error);
      return null;
    }
  }

  
}
