import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

import Alpine from "alpinejs";
declare global {
  interface Window {
    Alpine: any;
  }
}
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));

  window.Alpine  = Alpine;
  Alpine.start();