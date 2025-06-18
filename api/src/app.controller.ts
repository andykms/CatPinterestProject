import { 
  Controller, 
  Post, 
  Get, 
  Delete, 
  Body, 
  Param, 
  Headers,
  UnauthorizedException,
  ConflictException,
  NotFoundException,
  HttpCode,
  HttpStatus
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as crypto from 'crypto';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import { Like } from './entities/like.entity';

@Controller()
export class AppController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Like)
    private readonly likeRepository: Repository<Like>,
  ) {}

  // Регистрация пользователя
  @Post('user')
  async createUser(
    @Body('login') login: string,
    @Body('password') password: string,
  ) {
    // Проверка существования пользователя
    const existingUser = await this.userRepository.findOne({ where: { login } });
    console.log(existingUser);
    if (existingUser) {
      throw new ConflictException('User already exists');
    }

    // Хеширование пароля
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    
    // Создание пользователя
    const user = this.userRepository.create({
      login,
      password: hashedPassword,
    });

    const savedUser = await this.userRepository.save(user);
    
    // Генерация токена (user_id + secret_salt)
    const token = crypto
      .createHash('sha256')
      .update(`${savedUser.id}${process.env.TOKEN_SALT || 'default_salt'}`)
      .digest('hex');

    // Возвращаем пользователя без пароля и токен в заголовке
    const { password: _, ...userWithoutPassword } = savedUser;
    return {
      ...userWithoutPassword,
      token, // Возвращаем токен прямо в теле ответа для простоты
    };
  }

  // Получение списка лайков
  @Get('likes')
  async getLikes(@Headers('authorization') authHeader: string) {
    const userId = await this.verifyToken(authHeader);
    return this.likeRepository.find({ where: { user_id: userId } });
  }

  // Добавление лайка
  @Post('likes')
  async addLike(
    @Headers('authorization') authHeader: string,
    @Body('cat_id') catId: string,
  ) {
    const userId = await this.verifyToken(authHeader);
    
    const like = this.likeRepository.create({
      cat_id: catId,
      user_id: userId,
    });

    return this.likeRepository.save(like);
  }

  // Удаление лайка
  @Delete('likes/:cat_id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeLike(
    @Headers('authorization') authHeader: string,
    @Param('cat_id') catId: string,
  ) {
    const userId = await this.verifyToken(authHeader);
    
    const result = await this.likeRepository.delete({ 
      cat_id: catId,
      user_id: userId 
    });

    if (result.affected === 0) {
      throw new NotFoundException('Like not found');
    }
  }

  // Проверка токена
  private async verifyToken(authHeader: string): Promise<number> {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid token');
    }

    const token = authHeader.split(' ')[1];
    const allUsers = await this.userRepository.find();

    for (const user of allUsers) {
      const validToken = crypto
        .createHash('sha256')
        .update(`${user.id}${process.env.TOKEN_SALT || 'default_salt'}`)
        .digest('hex');

      if (token === validToken) {
        return user.id;
      }
    }

    throw new UnauthorizedException('Invalid token');
  }
}