import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Events } from '../data-type/data-type';
import { GetApiDataService } from '../get-api-data.service';

@Component({
  selector: 'app-format-event',
  templateUrl: './format-event.component.html',
  styleUrls: ['./format-event.component.scss'],
})
export class FormatEventComponent {
  protected events$: Observable<Events[]> =
    inject(GetApiDataService).getApiEvent();
  protected isActiveButtonBuffet: boolean = false;
  protected isActiveButtonSupper: boolean = false;
  protected isActiveButtonBanquet: boolean = false;

  protected handleClickButtonBuffet(): void {
    this.isActiveButtonBuffet = !this.isActiveButtonBuffet;
  }
  protected handleClickButtonSupper(): void {
    this.isActiveButtonSupper = !this.isActiveButtonSupper;
  }
  protected handleClickButtonBanquet(): void {
    this.isActiveButtonBanquet = !this.isActiveButtonBanquet;
  }

  // Знаю, что напрудил полного говна, но иначе не получается ¯\_(ツ)_/¯
}
