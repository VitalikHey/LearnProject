import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactFormType } from '../data-type/data-type';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
})
export class ContactFormComponent {
  protected readonly formContact: FormGroup<ContactFormType> =
    new FormGroup<ContactFormType>({
      name: new FormControl(null, Validators.required),
      number: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
}
