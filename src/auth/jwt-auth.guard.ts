import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Garde d'authentification JWT : à placer sur les routes qui requièrent un token valide
// AuthGuard('jwt') délègue la validation à la JwtStrategy enregistrée sous le nom 'jwt'
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
