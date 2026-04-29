import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { IsEmail, IsString, MinLength } from 'class-validator';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';

// DTO inline pour les routes d'authentification
// @IsEmail et @IsString sont des décorateurs class-validator utilisés par ValidationPipe
export class AuthDto {
  @IsEmail()
  email: string;
  @IsString()
  @MinLength(6)
  password: string;
}

// Contrôleur gérant les routes d'authentification prefixées par '/auth'
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // POST /auth/register — crée un compte et retourne un token JWT
  @Post('register')
  register(@Body() dto: AuthDto) {
    return this.authService.register(dto.email, dto.password);
  }

  // POST /auth/login — vérifie les credentials et retourne un token JWT
  @Post('login')
  login(@Body() dto: AuthDto) {
    return this.authService.login(dto.email, dto.password);
  }

  // GET /auth/me — retourne le profil de l'utilisateur connecté
  // @UseGuards(JwtAuthGuard) protège cette route : un token JWT valide est requis
  // req.user est injecté automatiquement par la JwtStrategy après validation du token
  @Get('me')
  @UseGuards(JwtAuthGuard)
  me(@CurrentUser() user: { id: number; email: string }) {
    return user;
  }
}
