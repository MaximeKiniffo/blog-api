import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Author } from './author.entity';
import { Repository } from 'typeorm';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

// @Injectable() permet à NestJS d'injecter ce service partout où il est déclaré
@Injectable()
export class AuthorsService {
  constructor(
    // Repository TypeORM pour l'entité Author : fournit toutes les méthodes d'accès à la base
    @InjectRepository(Author)
    private readonly authorRepository: Repository<Author>,
  ) {}

  // Récupère tous les auteurs sans filtre ni relation chargée
  findAll(): Promise<Author[]> {
    return this.authorRepository.find();
  }

  // Recherche un auteur par son id ; retourne null si introuvable
  // findOneBy est un raccourci de findOne({ where: { id } })
  findOne(id: number): Promise<Author | null> {
    return this.authorRepository.findOneBy({ id });
  }

  // Instancie l'entité Author depuis le DTO puis la sauvegarde en base
  // .create() ne touche pas la base, .save() effectue l'insertion et retourne l'entité avec son id généré
  create(data: CreateAuthorDto): Promise<Author> {
    const author = this.authorRepository.create(data);
    return this.authorRepository.save(author);
  }

  // Met à jour les champs de l'auteur en base, puis recharge l'entité pour la retourner à jour
  // .update() exécute un UPDATE SQL mais ne retourne pas l'entité, d'où le appel à findOne
  async update(id: number, data: UpdateAuthorDto): Promise<Author | null> {
    await this.authorRepository.update(id, data);
    return this.findOne(id);
  }

  // Supprime l'auteur correspondant à l'id de manière définitive
  // void : aucune donnée à retourner, le 204 du controller suffit à confirmer le succès
  async delete(id: number): Promise<void> {
    await this.authorRepository.delete(id);
  }
}
