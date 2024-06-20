import { Injectable } from '@angular/core';

@Injectable()
export class BoolShowPageService {
  public isShowComponent: number = 0

  public setIsShowComponent(value: number): void {
    this.isShowComponent = value
  }

  public getIsShowComponent(): number {
    return this.isShowComponent
  }
}
