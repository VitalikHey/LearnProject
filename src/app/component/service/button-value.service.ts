import { Injectable } from '@angular/core';

@Injectable()
export class ButtonValueService {
  private selectedValue: string = '';

  public setSelectedValue(value: string): void {
    if (!this.selectedValue) {
      this.selectedValue = value;
    } else {
      this.selectedValue = '';
    }
  }

  public getSelectedValue(): string {
    return this.selectedValue;
  }

  public deleteSelectedValue(): void {
    this.selectedValue = '';
  }

  public isValidValue(): boolean {
    if (!this.getSelectedValue()) {
      return false
    } return  true
  }
}
