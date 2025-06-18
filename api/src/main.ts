import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  
  // Настройка CORS
  app.enableCors({
    origin: 'http://localhost:5173', // Разрешить запросы с фронтенда
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Разрешить передачу куки/авторизации
    allowedHeaders: 'Content-Type,Authorization,X-Auth-Token',
  });

  await app.listen(3000);
}
bootstrap();
