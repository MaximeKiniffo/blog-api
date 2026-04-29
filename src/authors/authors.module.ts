import { Module } from '@nestjs/common';
import { AuthorsService } from './authors.service';
import { AuthorsController } from './authors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Author } from './author.entity';

@Module({
  // forFeature([Author]) enregistre le repository Author pour injection dans ce module
  imports: [TypeOrmModule.forFeature([Author])],
  providers: [AuthorsService],
  controllers: [AuthorsController],
  // AuthorsService est exporté pour être utilisé par d'autres modules si besoin
  exports: [AuthorsService],
})
export class AuthorsModule {}
