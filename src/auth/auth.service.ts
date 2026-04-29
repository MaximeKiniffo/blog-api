import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

// @Injectable() permet l'injection de ce service (ex: dans AuthController)
@Injectable()
export class AuthService {
  constructor(
    // UsersService pour accéder aux données des utilisateurs
    private readonly usersService: UsersService,
    // JwtService fourni par @nestjs/jwt pour signer / vérifier les tokens
    private readonly jwtService: JwtService,
  ) {}

  // Authentifie un utilisateur et retourne un token JWT si les credentials sont valides
  async login(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      // On ne différencie pas 'email introuvable' de 'mauvais mot de passe' pour éviter l'enumération
      throw new UnauthorizedException('Invalid credentials');
    }
    // bcrypt.compare compare le mot de passe en clair avec le hash stocké en base
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Le payload JWT contient l'email et l'id (sub = subject, convention JWT)
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Crée un compte via UsersService (qui gère le hashage et l'unicité de l'email)
  // puis signe et retourne directement un token pour connecter l'utilisateur après inscription
  async register(email: string, password: string) {
    const user = await this.usersService.create(email, password);
    const payload = { sub: user.id, email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
