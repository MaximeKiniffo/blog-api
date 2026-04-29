import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

// DTO de création d'un article : définit et valide les champs attendus dans le corps de la requête
export class CreateArticleDto {
  // Titre obligatoire, entre 3 et 100 caractères
  @IsString()
  @MinLength(3, { message: 'Title must be at least 3 characters long' })
  @MaxLength(100, { message: 'Title must be at most 100 characters long' })
  title: string;

  // Contenu obligatoire, non vide
  @IsString()
  @IsNotEmpty()
  content: string;

  // Statut de publication optionnel (false par défaut côté entité)
  @IsBoolean()
  @IsOptional()
  published?: boolean;

  // Tableau de tags optionnel ; chaque tag doit être une string d'au moins 2 caractères
  // { each: true } applique la validation à chaque élément du tableau
  @IsArray()
  @IsOptional()
  @IsString({ each: true })
  @MinLength(2, { each: true })
  tags?: string[];

  // Id de l'auteur associé, optionnel (un article peut exister sans auteur)
  @IsInt()
  @IsOptional()
  author_id?: number;
}
