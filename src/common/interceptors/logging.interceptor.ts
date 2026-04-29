import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Logger } from '@nestjs/common';

// Intercepteur global qui logue chaque requête HTTP avec sa méthode, son URL et son temps d'exécution
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  // Logger NestJS nommé d'après la classe pour identifier la source dans les logs
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url } = request;
    // Enregistre le timestamp avant le traitement de la requête
    const start = Date.now();

    // next.handle() exécute le handler de la route (controller)
    // tap() s'exécute une fois la réponse émise, sans modifier les données
    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - start;
        this.logger.log(`${method} ${url} - ${duration}ms`);
      }),
    );
  }
}
