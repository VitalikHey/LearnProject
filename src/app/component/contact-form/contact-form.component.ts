import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { Events } from '../data-type/data-type';
import { GetApiDataService } from '../get-api-data.service';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent {
  protected notValidForm: string = 'page-form__input';
  protected isShowTextDownForm: boolean = false;

  protected formContact: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    number: new FormControl('', Validators.required),
    email: new FormControl('', Validators.email),
  });

  protected handleValueContact(): void {
    if (this.formContact.valid) {
      this.notValidForm = 'page-form__input';
      this.isShowTextDownForm = false;
      console.log(this.formContact.value);
    } else {
      this.isShowTextDownForm = true;
      this.notValidForm = 'page-form__input not-valid-form';
    }
  }
}
