import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

// DTO de création d'un auteur : valide les données reçues avant insertion en base
export class CreateAuthorDto {
  // Nom obligatoire, entre 2 et 100 caractères
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(100, { message: 'Name must be at most 100 characters long' })
  name: string;

  // Biographie obligatoire, non vide
  @IsString()
  @IsNotEmpty()
  bio: string;
}
