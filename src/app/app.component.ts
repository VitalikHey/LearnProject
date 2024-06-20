import {Component} from '@angular/core';
import {Steps} from "./component/data-type/data-type";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title: string = 'event-task';
  protected isShowComponent: number = 0
  protected readonly Steps = Steps;


  protected handleClick(): void {
    this.isShowComponent = 1
  }
}
