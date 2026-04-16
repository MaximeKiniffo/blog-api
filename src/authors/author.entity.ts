// src/authors/author.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Article } from '../articles/article.entity';

// Mappe cette classe sur la table 'authors' en base de données
@Entity('authors')
export class Author {
  // Clé primaire auto-incrémentée gérée par la base
  @PrimaryGeneratedColumn()
  id: number;

  // Nom de l'auteur, obligatoire (NOT NULL par défaut)
  @Column()
  name: string;

  // Biographie de l'auteur, explicitement marquée NOT NULL
  @Column({ nullable: false })
  bio: string;

  // Relation One-to-Many : un auteur peut avoir plusieurs articles
  // La propriété inverse 'article.author' assure la cohérence de la relation des deux côtés
  @OneToMany(() => Article, (article) => article.author)
  articles: Article[];
}
