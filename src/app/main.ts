import { bootstrap } from 'angular2/platform/browser';
import { HTTP_PROVIDERS } from 'angular2/http';
import { AppComponent } from './app.component';

bootstrap(AppComponent, [HTTP_PROVIDERS]).then(
    success => console.log('AppComponent bootstrapped!'),
    error => console.log(error)
);
