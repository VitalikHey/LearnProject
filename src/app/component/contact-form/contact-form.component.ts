import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactFormType } from '../data-type/data-type';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent {
  protected notValidForm: string = 'page-form__input';
  protected isShowTextDownForm: boolean = false;

  protected readonly formContact: FormGroup<ContactFormType> =
    new FormGroup<ContactFormType>({
      name: new FormControl(null, Validators.required),
      number: new FormControl(null, Validators.required),
      email: new FormControl(null, Validators.email),
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
