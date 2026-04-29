import {
  Controller,
  Get,
  Param,
  Post,
  HttpCode,
  HttpStatus,
  Body,
  Delete,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';

// Déclare ce contrôleur comme gestionnaire des routes préfixées par '/authors'
@Controller('authors')
export class AuthorsController {
  // Injection du service via le constructeur (IoC NestJS)
  constructor(private readonly authorsService: AuthorsService) {}

  // GET /authors — retourne la liste de tous les auteurs
  @Get()
  findAll() {
    return this.authorsService.findAll();
  }

  // GET /authors/:id — retourne un auteur par son identifiant
  // Le '+' convertit l'id (string de l'URL) en number attendu par le service
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.authorsService.findOne(id);
  }

  // POST /authors — crée un nouvel auteur
  // 201 Created est le code HTTP sémantiquement correct pour une création réussie
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() body: CreateAuthorDto) {
    return this.authorsService.create(body);
  }

  // PUT /authors/:id — met à jour un auteur existant
  // 200 OK est explicitement forcé ici (c'est la valeur par défaut mais notée pour la clarté)
  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Param('id', ParseIntPipe) id: number, @Body() body: UpdateAuthorDto) {
    return this.authorsService.update(id, body);
  }

  // DELETE /authors/:id — supprime un auteur
  // 204 No Content : la suppression ne retourne pas de corps de réponse
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.authorsService.delete(id);
  }
}
