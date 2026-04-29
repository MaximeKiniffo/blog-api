import { Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Article } from './article.entity';

@Module({
  // forFeature([Article]) enregistre le repository Article dans ce module
  // afin qu'il puisse être injecté via @InjectRepository(Article)
  imports: [TypeOrmModule.forFeature([Article])],
  controllers: [ArticlesController],
  providers: [ArticlesService],
  // exports permet aux autres modules d'utiliser ArticlesService s'ils importent ArticlesModule
  exports: [ArticlesService],
})
export class ArticlesModule {}
