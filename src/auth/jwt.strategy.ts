import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

// Stratégie Passport pour valider les tokens JWT sur chaque requête protégée
// Elle est appelée automatiquement par JwtAuthGuard
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService) {
    super({
      // Extrait le token depuis le header Authorization: Bearer <token>
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: false = les tokens expirés sont rejetés
      ignoreExpiration: false,
      // Clé secrète utilisée pour vérifier la signature du token
      secretOrKey: config.get<string>('JWT_SECRET')!,
    });
  }

  // validate() est appelée après vérification du token
  // L'objet retourné est injecté dans req.user par Passport
  validate(payload: { sub: string; email: string }) {
    return { id: payload.sub, email: payload.email };
  }
}
