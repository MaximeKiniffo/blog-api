// src/tags/tag.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';
import { Article } from '../articles/article.entity';

// Mappe cette classe sur la table 'tags' en base de données
@Entity('tags')
export class Tag {
  // Clé primaire auto-incrémentée gérée par la base
  @PrimaryGeneratedColumn()
  id: number;

  // Nom du tag, unique en base pour éviter les doublons (ex: pas deux tags 'NestJS')
  @Column({ unique: true })
  name: string;

  // Relation Many-to-Many : un tag peut être associé à plusieurs articles et vice-versa
  // NestJS/TypeORM gère automatiquement la table de jointure intermédiaire
  @ManyToMany(() => Article, (article) => article.tags)
  articles: Article[];
}
