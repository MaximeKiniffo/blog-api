import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateAuthorDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2, { message: 'Name must be at least 2 characters long' })
  @MaxLength(100, { message: 'Name must be at most 100 characters long' })
  name: string;

  @IsString()
  @IsNotEmpty()
  bio: string;
}
