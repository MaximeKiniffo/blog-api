import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Author } from '../authors/author.entity';

// Mappe cette classe sur la table 'articles' en base de données
@Entity('articles')
export class Article {
  // Clé primaire auto-incrémentée gérée par la base
  @PrimaryGeneratedColumn()
  id: number;

  // Titre de l'article, colonne obligatoire (NOT NULL par défaut)
  @Column()
  title: string;

  // Contenu long de l'article, stocké en type 'text' pour supporter de grands textes
  @Column('text')
  content: string;

  // Statut de publication ; false par défaut = l'article est brouillon à la création
  @Column({ type: 'boolean', default: false })
  published: boolean;

  // Tags stockés sous forme de tableau sérialisé en une seule colonne (CSV) ; optionnel
  @Column({ type: 'simple-array', nullable: true })
  tags: string[];

  // Date de création automatiquement renseignée par TypeORM lors de l'insertion
  @CreateDateColumn()
  createdAt: Date;

  // Date de mise à jour automatiquement actualisée par TypeORM à chaque modification
  @UpdateDateColumn()
  updatedAt: Date;

  // Relation Many-to-One : plusieurs articles peuvent appartenir au même auteur
  // @JoinColumn définit la colonne de clé étrangère utilisée pour la jointure
  @ManyToOne(() => Author, (author) => author.articles)
  @JoinColumn({ name: 'author_id' })
  author: Author;

  // Colonne de clé étrangère exposée directement, utile pour écrire/lire l'id sans charger la relation
  @Column({ nullable: true })
  author_id: number;
}
