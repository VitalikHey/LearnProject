import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './component/header/header.component';
import { NgOptimizedImage } from '@angular/common';
import { ContactFormComponent } from './component/contact-form/contact-form.component';
import { GetApiDataEvent } from './component/service/get-api-data.event';
import { EventFormComponent } from './component/event-form/event-form.component';
import { HeaderEventComponent } from './component/header-event/header-event.component';
import { PhoneMaskDirective } from './directive/tel-mask.directive';
import { InfoEventComponent } from './component/info-event/info-event.component';
import { ApplicationButtonComponent } from './component/application-button/application-button.component';

@NgModule({
  declarations: [
    PhoneMaskDirective,
    AppComponent,
    HeaderComponent,
    ContactFormComponent,
    EventFormComponent,
    HeaderEventComponent,
    InfoEventComponent,
    ApplicationButtonComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgOptimizedImage,
    ReactiveFormsModule,
  ],
  providers: [GetApiDataEvent, EventFormComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
