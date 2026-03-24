import { ApplicationConfig, provideZonelessChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';
import { routes } from './app.routes';
import { ClientRepository } from './core/clients/domain/client.repository';
import { HttpClientRepository } from './core/clients/infrastructure/http-client.repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZonelessChangeDetection(),
    provideHttpClient(),
    provideRouter(routes),
    { provide: ClientRepository, useClass: HttpClientRepository }
  ]
};
