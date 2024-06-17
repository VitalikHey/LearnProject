import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaskCalendarComponent } from './component/task-calendar/task-calendar.component';
import { JulianPipe } from './pipes/calendar-pipe/julian.pipe';
import { FormsModule } from '@angular/forms';
import { BaikalPipe } from './pipes/baikal-pipe/baikal.pipe';
import { HttpClientModule } from '@angular/common/http';
import { GetApiService } from './component/get-api.service';
import { ApiResponseComponent } from './component/api-response/api-response.component';

@NgModule({
  declarations: [
    ApiResponseComponent,
    BaikalPipe,
    JulianPipe,
    AppComponent,
    TaskCalendarComponent,
  ],
  imports: [HttpClientModule, BrowserModule, AppRoutingModule, FormsModule],
  providers: [GetApiService],
  bootstrap: [AppComponent],
})
export class AppModule {}
