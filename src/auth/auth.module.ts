import { Module } from '@nestjs/common';
import { StringValue } from 'ms';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UsersModule } from '../users/users.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    // UsersModule est importé pour accéder à UsersService (recherche / création d'utilisateurs)
    UsersModule,
    // PassportModule active le système de stratégies d'authentification (Passport.js)
    PassportModule,
    // JwtModule.register() configure la signature et la durée de vie des tokens JWT
    // Le secret doit être stocké en variable d'environnement en production
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET')!,
        signOptions: {
          expiresIn: (config.get<string>('JWT_EXPIRES_IN') ??
            '1h') as StringValue,
        },
      }),
    }),
  ],
  // JwtStrategy définit la logique de validation du token
  // JwtAuthGuard est le garde réutilisable pour protéger les routes
  providers: [AuthService, JwtStrategy, JwtAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
