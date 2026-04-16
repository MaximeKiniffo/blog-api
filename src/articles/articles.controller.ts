import {
  Controller,
  Get,
  Param,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Patch,
  Put,
  Delete,
  Query,
} from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

// Déclare ce contrôleur comme gestionnaire des routes préfixées par '/articles'
@Controller('articles')
export class ArticlesController {
  // Injection du service via le constructeur : NestJS fournit automatiquement l'instance (IoC)
  constructor(private readonly articlesService: ArticlesService) {}

  // GET /articles ou GET /articles?published=true|false
  // @Query récupère le paramètre 'published' depuis l'URL ; il est optionnel (?)
  // Si absent, tous les articles sont retournés ; sinon on filtre par statut de publication
  @Get()
  findAll(@Query('published') published?: boolean) {
    return this.articlesService.findAll(published);
  }

  // GET /articles/:id — récupère un article par son identifiant
  // @Param extrait ':id' depuis l'URL ; le '+' convertit la chaîne en nombre
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.articlesService.findOne(+id);
  }

  // POST /articles — crée un nouvel article
  // @HttpCode force le statut HTTP 201 (Created) au lieu du 200 par défaut
  // @Body extrait et valide le corps de la requête via le DTO
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateArticleDto) {
    return this.articlesService.create(body);
  }

  // PUT /articles/:id — met à jour un article existant (remplacement complet)
  // Combine @Param pour l'id et @Body pour les nouvelles données
  @Put(':id')
  update(@Param('id') id: string, @Body() body: UpdateArticleDto) {
    return this.articlesService.update(+id, body);
  }

  // DELETE /articles/:id — supprime un article
  // @HttpCode 204 (No Content) : la suppression réussie ne retourne pas de corps
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }

  // PATCH /articles/:id/publish — publie un article
  @Patch(':id/publish')
  publish(@Param('id') id: string) {
    return this.articlesService.publish(+id);
  }
}
