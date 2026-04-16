import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Article } from './article.entity';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

// @Injectable() permet à NestJS d'injecter ce service dans d'autres classes (controllers, etc.)
@Injectable()
export class ArticlesService {
  constructor(
    // @InjectRepository injecte le repository TypeORM lié à l'entité Article
    // Il sert d'interface entre le service et la base de données
    @InjectRepository(Article)
    private readonly articleRepository: Repository<Article>,
  ) {}

  // Récupère tous les articles avec leur auteur associé
  // Si 'published' est fourni, filtre par statut ; sinon retourne tous les articles
  // L'opérateur ternaire évite d'appliquer un filtre vide qui pourrait fausser la requête
  findAll(published?: boolean): Promise<Article[]> {
    return this.articleRepository.find({
      relations: ['author'],
      where: published !== undefined ? { published } : {},
    });
  }

  // Recherche un article unique par son id, avec l'auteur en relation
  // Lance une erreur si aucun article ne correspond
  async findOne(id: number): Promise<Article> {
    const article = await this.articleRepository.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!article) {
      throw new NotFoundException(`Article #${id} not found`);
    }
    return article;
  }

  // Crée une nouvelle entrée en base
  // .create() instancie l'entité à partir du DTO ; .save() l'insère en base et retourne l'objet persisté
  create(data: CreateArticleDto): Promise<Article> {
    const article = this.articleRepository.create(data);
    return this.articleRepository.save(article);
  }

  // Met à jour les champs fournis pour l'article correspondant à l'id
  // .update() ne retourne pas l'entité mise à jour, donc on rappelle findOne pour la retourner
  async update(id: number, data: UpdateArticleDto): Promise<Article> {
    await this.articleRepository.update(id, data);
    return this.findOne(id);
  }

  // Supprime définitivement l'article en base par son id
  // Retourne void car aucune donnée n'est à renvoyer après suppression
  async remove(id: number): Promise<void> {
    await this.findOne(id);
    await this.articleRepository.delete(id);
  }

  async publish(id: number): Promise<Article> {
    const article = await this.findOne(id);
    if (article.published) {
      throw new ConflictException('Article already published');
    }
    return this.update(id, { published: true });
  }
}
