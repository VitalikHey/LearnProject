import { Component, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { ContactFormType } from '../data-type/data-type';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ContactFormComponent),
      multi: true,
    },
  ],
})
export class ContactFormComponent implements ControlValueAccessor {
  protected onChange?: (value: ContactFormType) => void;
  protected onTouched?: () => void;

  public writeValue(value: ContactFormType): void {
    if (value) {
      this.formContact.setValue({
        name: value.name.value,
        number: value.number.value,
        email: value.email.value,
      });
    }
  }

  registerOnChange(fn: (value: ContactFormType) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  protected readonly formContact: FormGroup<ContactFormType> =
    new FormGroup<ContactFormType>({
      name: new FormControl(null, Validators.required),
      number: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
}
