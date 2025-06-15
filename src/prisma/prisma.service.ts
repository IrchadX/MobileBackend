/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-misused-promises */
 
 
/* eslint-disable @typescript-eslint/require-await */
/* eslint-disable prettier/prettier */
import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  [x: string]: any;

  async onModuleInit() {
    await this.$connect();
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }

  async enableShutdownHooks(app: { close: () => Promise<void> }) {
    // Use the correct event type from Prisma types
    process.on('beforeExit', async () => {
      await this.$disconnect();
      await app.close();
    });
  }
}