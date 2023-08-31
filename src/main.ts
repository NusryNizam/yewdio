import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";

import { AppModule } from "./app/app.module";

import { environment } from 'src/environments/environment';

if(environment.production) {
  console.log('PRODUCTION MODE');
  window.console.log = () => {}
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));
