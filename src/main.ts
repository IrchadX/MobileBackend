/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppelModule } from './Functions/appel/appel.module';

async function bootstrap() {
  const app = await NestFactory.create(AppelModule);
  app.enableCors();
  await app.listen(process.env.PORT ?? 3000, '0.0.0.0');
}
bootstrap();
