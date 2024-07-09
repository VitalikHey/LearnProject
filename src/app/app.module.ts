import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgOptimizedImage } from '@angular/common';
import { ContactFormComponent } from './component/contact-form/contact-form.component';
import { GetApiDataEvent } from './component/service/get-api-data.event';
import { EventFormComponent } from './component/event-form/event-form.component';
import { PhoneMaskDirective } from './directive/tel-mask.directive';
import { InfoEventComponent } from './component/info-event/info-event.component';
import { ContinueButtonComponent } from './component/continue-button/continue-button.component';
import { ApplicationButtonComponent } from './component/application-button/application-button.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { TestComponent } from './component/test/test.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatChipsModule } from '@angular/material/chips';

@NgModule({
  declarations: [
    PhoneMaskDirective,
    AppComponent,
    ContactFormComponent,
    EventFormComponent,
    InfoEventComponent,
    ContinueButtonComponent,
    ApplicationButtonComponent,
    TestComponent,
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    NgOptimizedImage,
    ReactiveFormsModule,
    MatStepperModule,
    MatButtonModule,
    MatIconModule,
    MatButtonToggleModule,
    MatInputModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatChipsModule,
  ],
  providers: [GetApiDataEvent, EventFormComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
