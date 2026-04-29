import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

// @Injectable() rend ce service injectable dans d'autres classes (ex: AuthService)
@Injectable()
export class UsersService {
  constructor(
    // Repository TypeORM injecté pour opérer sur la table 'users'
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}

  // Recherche un utilisateur par son email (utilisé lors du login pour vérifier les credentials)
  findByEmail(email: string) {
    return this.userRepository.findOne({ where: { email } });
  }

  // Crée un nouvel utilisateur après vérification d'unicité de l'email
  // Le mot de passe est hashé avec bcrypt (saltRounds=10) avant stockage
  async create(email: string, password: string): Promise<User> {
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      // Lève une erreur 409 Conflict si l'email est déjà utilisé
      throw new ConflictException('Email already used');
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = this.userRepository.create({
      email,
      password: hashedPassword,
    });
    return this.userRepository.save(user);
  }
}
