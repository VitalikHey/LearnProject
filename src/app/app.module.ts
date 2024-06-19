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
import { GetApiDataService } from './component/get-api-data.service';
import { EventFormComponent } from './component/event-form/event-form.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormatEventComponent,
    ContactFormComponent,
    EventFormComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgOptimizedImage,
    ReactiveFormsModule,
  ],
  providers: [GetApiDataService],
  bootstrap: [AppComponent],
})
export class AppModule {}
