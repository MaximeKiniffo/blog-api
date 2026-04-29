import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ExecutionContext, CallHandler, NestInterceptor } from '@nestjs/common';

// Structure de réponse normalisée retournée par toutes les routes de l'API
export interface Response<T> {
  data: T;
  timestamp: string;
}

// Intercepteur global qui enveloppe chaque réponse réussie dans { data, timestamp }
// Cela assure un format de réponse cohérent pour tous les endpoints
@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<
  T,
  Response<T>
> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    return next.handle().pipe(
      // map() transforme la valeur émise par le handler
      map((data) => {
        // Si la réponse est vide (ex: DELETE 204), on la laisse passer sans transformation
        if (data === null || data === undefined) return data;
        return {
          data,
          timestamp: new Date().toISOString(),
        };
      }),
    );
  }
}
