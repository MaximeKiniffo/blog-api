import { Injectable, Module } from '@nestjs/common';
import { ArticlesController } from './articles.controller';
import { ArticlesService } from './articles.service';

@Module({
  controllers: [ArticlesController],
  providers: [ArticlesService],
  exports: [ArticlesService],
})
export class ArticlesModule {}

@Injectable()
export class ArticlesRepository {
  constructor(private readonly articlesService: ArticlesService) {}
}
