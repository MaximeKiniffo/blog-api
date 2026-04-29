import { CreateArticleDto } from './create-article.dto';
import { PartialType } from '@nestjs/mapped-types';

// PartialType rend tous les champs de CreateArticleDto optionnels
// Permet de ne mettre à jour que les champs fournis (PATCH/PUT partiel)
export class UpdateArticleDto extends PartialType(CreateArticleDto) {}
