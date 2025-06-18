import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { User } from './entities/user.entity';
import { Like } from './entities/like.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT) || 5432,
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || '76911120', 
      database: process.env.DB_NAME || 'support_lk_db',
      entities: [User, Like],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([User, Like]), // Регистрируем сущности
  ],
  controllers: [AppController],
})
export class AppModule {}