import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import { EnvironmentService } from './services/environment.service';
import { ApiService } from './services/api.service';

import { EnableLoginGuard } from './guards/enable-login.guard';

import { AppComponent } from './app.component';

export function environmentInitializer(env: EnvironmentService) {
  return () => env.load();
}

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', loadChildren: 'app/pages/home/home.module#HomeModule' },
  {
    path: 'login',
    canLoad: [EnableLoginGuard],
    canActivate: [EnableLoginGuard],
    canActivateChild: [EnableLoginGuard],
    loadChildren: 'app/pages/login/login.module#LoginModule'
  }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    EnvironmentService,
    {
      provide: APP_INITIALIZER,
      useFactory: environmentInitializer,
      deps: [EnvironmentService],
      multi: true
    },
    ApiService,
    EnableLoginGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
