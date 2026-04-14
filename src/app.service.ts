import { Injectable } from '@nestjs/common';

//décorateur qui permet de définir une classe comme un service
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getStatus(): { status: string; timestamp: string } {
    return { status: 'ok', timestamp: new Date().toISOString() };
  }
}
