import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

//décorateur qui permet de définir le chemin de l'API
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  //décorateur qui permet de définir le chemin de l'API
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/status')
  getStatus(): { status: string; timestamp: string } {
    return this.appService.getStatus();
  }
}
