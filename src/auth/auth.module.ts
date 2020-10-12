import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from '../users/users.repository';
import { JwtModule } from '@nestjs/jwt/dist/jwt.module';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
    imports: [
      TypeOrmModule.forFeature([UserRepository]),
      PassportModule.register({ defaultStrategy: 'jwt' }),
      JwtModule.register({
        secret: 'super-secret',
        signOptions: {
          expiresIn: 18000,
        },
      }),
    ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy],
    exports: [JwtStrategy, PassportModule],
  })
export class AuthModule {}
