import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './component/header/header.component';
import {NgOptimizedImage} from "@angular/common";
import { FormatEventComponent } from './component/format-event/format-event.component';
import { ApplicationButtonComponent } from './component/application-button/application-button.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FormatEventComponent,
    ApplicationButtonComponent,
  ],
  imports: [HttpClientModule, BrowserModule, AppRoutingModule, FormsModule, NgOptimizedImage],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
