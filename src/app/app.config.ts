import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async'; // Importe este
import { provideHttpClient, withFetch } from '@angular/common/http'; // Adicione withFetch se for usar o fetch API internamente pelo HttpClient

import { routes } from './app.routes';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { provideServiceWorker } from '@angular/service-worker';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideAnimationsAsync(), // Adicione esta linha para animações do Angular Material
    provideHttpClient(withFetch()), // Adicione para requisições HTTP se necessário
    provideServiceWorker('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
    })
    // Removi a duplicata de provideServiceWorker que existia no seu arquivo
  ]
};