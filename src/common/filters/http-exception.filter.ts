import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

// @Catch(HttpException) indique que ce filtre intercepte uniquement les HttpException
// (et leurs sous-classes : NotFoundException, UnauthorizedException, etc.)
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    // Accès au contexte HTTP pour récupérer la requête et la réponse Express
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();

    // getResponse() peut retourner une string ou un objet selon l'exception levée
    // On normalise en extrayant toujours le champ 'message'
    const message =
      typeof exceptionResponse === 'string'
        ? exceptionResponse
        : (exceptionResponse as Record<string, unknown>).message;

    // Retourne une réponse JSON uniforme pour toutes les erreurs HTTP de l'API
    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
    });
  }
}
