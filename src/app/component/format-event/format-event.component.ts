import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Events } from '../data-type/data-type';
import { GetApiDataService } from '../service/get-api-data.service';
import { ButtonValueService } from '../service/button-value.service';

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
  constructor(private valueService: ButtonValueService) {}

  protected setValue(value: string): void {
    this.valueService.setSelectedValue(value);
  }

  protected handleClickButtonBuffet(): void {
    if (this.isActiveButtonSupper || this.isActiveButtonBanquet) {
      this.isActiveButtonSupper = false;
      this.isActiveButtonBanquet = false;
      this.valueService.deleteSelectedValue();
    }
    this.setValue('Фуршет');
    this.isActiveButtonBuffet = !this.isActiveButtonBuffet;
  }
  protected handleClickButtonSupper(): void {
    if (this.isActiveButtonBuffet || this.isActiveButtonBanquet) {
      this.isActiveButtonBuffet = false;
      this.isActiveButtonBanquet = false;
      this.valueService.deleteSelectedValue();
    }
    this.setValue('Гастрономический ужин');
    this.isActiveButtonSupper = !this.isActiveButtonSupper;
  }
  protected handleClickButtonBanquet(): void {
    if (this.isActiveButtonSupper || this.isActiveButtonBuffet) {
      this.isActiveButtonBuffet = false;
      this.isActiveButtonSupper = false;
      this.valueService.deleteSelectedValue();
    }
    this.setValue('Банкет');
    this.isActiveButtonBanquet = !this.isActiveButtonBanquet;
  }

  // Знаю, что напрудил полного говна, но иначе не получается ¯\_(ツ)_/¯
}
