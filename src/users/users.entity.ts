import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { Exclude } from 'class-transformer';

// Mappe cette classe sur la table 'users' en base de données
@Entity('users')
export class User {
  // Clé primaire auto-incrémentée
  @PrimaryGeneratedColumn()
  id: number;

  // Email unique : deux utilisateurs ne peuvent pas partager la même adresse
  @Column({ unique: true })
  email: string;

  // Mot de passe stocké hashé (bcrypt) — jamais en clair en base
  @Column()
  @Exclude()
  password: string;

  // Rôle de l'utilisateur, 'user' par défaut ; peut évoluer vers 'admin' etc.
  @Column({ default: 'user' })
  role: string;
}
