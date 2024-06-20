import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './component/header/header.component';
import { NgOptimizedImage } from '@angular/common';
import { FormatEventComponent } from './component/format-event/format-event.component';
import { ContactFormComponent } from './component/contact-form/contact-form.component';
import { GetApiDataService } from './component/service/get-api-data.service';
import { EventFormComponent } from './component/event-form/event-form.component';
import { ButtonValueService } from './component/service/button-value.service';
import { EventComponent } from './component/event/event.component';
import { HeaderEventComponent } from './component/header-event/header-event.component';
import {BoolShowPageService} from "./component/service/bool-show-page.service";
import {PhoneMaskDirective} from "./directive/tel-mask.directive";

@NgModule({
  declarations: [
    PhoneMaskDirective,
    AppComponent,
    HeaderComponent,
    FormatEventComponent,
    ContactFormComponent,
    EventFormComponent,
    EventComponent,
    HeaderEventComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgOptimizedImage,
    ReactiveFormsModule,
  ],
  providers: [GetApiDataService, ButtonValueService, BoolShowPageService, EventFormComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
