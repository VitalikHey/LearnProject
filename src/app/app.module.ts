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
import { MatIconModule } from '@angular/material/icon';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { GetApiAdditionalService } from './component/service/get-api-additional.service';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from './environments/environment';
import { SendingDataService } from './component/service/sending-data.service';
import { ToastrModule } from 'ngx-toastr';
import { ToastService } from './component/service/toast.service';
import { JsonInterceptorService } from './component/service/json-interceptor.service';

@NgModule({
  declarations: [
    PhoneMaskDirective,
    AppComponent,
    ContactFormComponent,
    EventFormComponent,
    InfoEventComponent,
    ContinueButtonComponent,
    ApplicationButtonComponent,
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
    MatDatepickerModule,
    MatNativeDateModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ToastrModule.forRoot(),
  ],
  providers: [
    SendingDataService,
    GetApiDataEvent,
    EventFormComponent,
    provideAnimations(),
    GetApiAdditionalService,
    ToastService,
    JsonInterceptorService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
