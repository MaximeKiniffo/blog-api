import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { TransformInterceptor } from './common/interceptors/transform.interceptor';
import { Reflector } from '@nestjs/core';

async function bootstrap() {
  // Crée l'instance de l'application NestJS à partir du module racine
  const app = await NestFactory.create(AppModule);

  // Enregistre le filtre global qui intercepte toutes les HttpException
  // et les formate en une réponse JSON cohérente (statusCode, message, path, timestamp)
  app.useGlobalFilters(new HttpExceptionFilter());

  // Enregistre les intercepteurs globaux appliqués à chaque requête :
  // - LoggingInterceptor : logue la méthode, l'URL et le temps de traitement
  // - TransformInterceptor : enveloppe chaque réponse dans { data, timestamp }
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector)),
    new LoggingInterceptor(),
    new TransformInterceptor(),
  );

  // Active la validation globale des DTOs via class-validator :
  // - whitelist : supprime les propriétés non décorées (non attendues)
  // - forbidNonWhitelisted : renvoie une erreur 400 si une propriété inconnue est envoyée
  // - transform : convertit automatiquement les types primitifs (ex: string → number)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Démarre le serveur HTTP sur le port défini en variable d'environnement, ou 3000 par défaut
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
