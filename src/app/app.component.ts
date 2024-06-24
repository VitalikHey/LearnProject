import { Component } from '@angular/core';
import {Steps} from "./component/data-type/data-type";
import {BoolShowPageService} from "./component/service/bool-show-page.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title: string = 'event-task';
  protected isShowComponent: number = 0;
  protected readonly Steps = Steps;

  constructor(protected isShowComponentService: BoolShowPageService) {
    this.isShowComponent = isShowComponentService.getIsShowComponent();
  }
}

//
