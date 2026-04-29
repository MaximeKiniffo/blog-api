import { CreateAuthorDto } from './create-author.dto';
import { PartialType } from '@nestjs/mapped-types';

// PartialType rend tous les champs de CreateAuthorDto optionnels
// Cela permet une mise à jour partielle sans avoir à redéfinir toutes les validations
export class UpdateAuthorDto extends PartialType(CreateAuthorDto) {}
