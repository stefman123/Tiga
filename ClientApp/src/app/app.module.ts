import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';
import { enableProdMode } from "@angular/core";
import { platformBrowserDynamic } from "@angular/platform-browser-dynamic";
import * as Sentry from "@sentry/angular";
import { Integrations } from "@sentry/tracing";

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { VehicleFormComponent } from './vehicle-form/vehicle-form.component';
import { VehicleService } from './services/vechicle.service';
import { PhotoService } from './services/photo.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
 import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
 import { trigger, state, style, animate, transition } from '@angular/animations';
import {
  NgxAwesomePopupModule,
  DialogConfigModule,
  ConfirmBoxConfigModule,
  ToastNotificationConfigModule
} from '@costlydeveloper/ngx-awesome-popup';
import { AppErrorHandler } from './app.error-handler';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { PaginationComponent } from './shared/pagination.component';
import { VehicleViewComponent } from './vehicle-view/vehicle-view.component';

Sentry.init({
 dsn: "https://cee69f4c26bb4254a8bcc0dc895a1fe2@o1015284.ingest.sentry.io/5980772" ,
 integrations: [
   // Registers and configures the Tracing integration,
   // which automatically instruments your application to monitor its
   // performance, including custom Angular routing instrumentation

   new Integrations.BrowserTracing({
     tracingOrigins: ["localhost"],
     routingInstrumentation: Sentry.routingInstrumentation,
   }),
 ],

 // Set tracesSampleRate to 1.0 to capture 100%
 // of transactions for performance monitoring.
 // We recommend adjusting this value in production
 tracesSampleRate: 1.0,
});


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    VehicleFormComponent,
    VehiclesComponent,
    PaginationComponent,
    VehicleViewComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    NgxAwesomePopupModule.forRoot(),
    DialogConfigModule.forRoot(),
    ConfirmBoxConfigModule.forRoot(),
    ToastNotificationConfigModule.forRoot(),
    HttpClientModule,
    FormsModule,
     FontAwesomeModule,
    RouterModule.forRoot([
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent},
    { path: 'vehicles/new', component: VehicleFormComponent},
    { path: 'vehicles/edit/:id', component: VehicleFormComponent},
    { path: 'vehicles/view/:id', component: VehicleViewComponent },
    { path: 'vehicles', component: VehiclesComponent },
    { path: 'counter', component: CounterComponent },
    { path: 'fetch-data', component: FetchDataComponent },
], { relativeLinkResolution: 'legacy' }) ],
  providers: [{ provide: ErrorHandler, useClass: AppErrorHandler},   {
    provide: Sentry.TraceService,
    deps: [Router],
  },VehicleService, PhotoService],
  bootstrap: [AppComponent]
})
export class AppModule { }


// platformBrowserDynamic()
//   .bootstrapModule(AppModule)
//   .then(success => console.log(`Bootstrap success`))
//   .catch(err => console.error(err));
