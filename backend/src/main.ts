// ==== server/src/main.ts ====
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  await app.listen(3009);
  console.log('Server running on http://localhost:3001');
}
bootstrap();
