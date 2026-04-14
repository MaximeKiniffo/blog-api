import { Injectable } from '@nestjs/common';
import { CreateArticleDto } from './dto/create-article.dto';

export interface Article {
  id: number;
  title: string;
  content: string;
  published: boolean;
}

@Injectable()
export class ArticlesService {
  private articles: Article[] = [
    {
      id: 1,
      title: 'First article',
      content: 'Content of the first article',
      published: true,
    },
    {
      id: 2,
      title: 'Second article',
      content: 'Content of the second article',
      published: false,
    },
    {
      id: 3,
      title: 'Third article',
      content: 'Content of the third article',
      published: true,
    },
  ];

  private nextId = 4;

  findAll() {
    return this.articles;
  }

  findOne(id: number): Article | undefined {
    return this.articles.find((article) => article.id === id);
  }

  create(article: CreateArticleDto): Article {
    const newArticle = {
      id: this.nextId++,
      published: false,
      ...article,
    };
    this.articles.push(newArticle);
    return newArticle;
  }

  update(id: number, article: Partial<CreateArticleDto>): Article | undefined {
    const index = this.articles.findIndex((article) => article.id === id);
    if (index === -1) {
      return undefined;
    }
    this.articles[index] = { ...this.articles[index], ...article };
    return this.articles[index];
  }

  remove(id: number): boolean {
    const index = this.articles.findIndex((article) => article.id === id);
    if (index === -1) {
      return false;
    }
    this.articles.splice(index, 1);
    return true;
  }
}
