import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  Validators,
} from '@angular/forms';
import { ContactFormControl, ContactFormType } from '../data-type/data-type';
import { map, merge, Observable, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ContactFormComponent),
      multi: true,
    },
  ],
})
export class ContactFormComponent
  implements ControlValueAccessor, OnInit, OnDestroy
{
  private readonly destroy$: Subject<void> = new Subject<void>();

  protected onChange?: (value: ContactFormControl) => void;
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

  public registerOnChange(fn: (value: ContactFormControl) => void): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  protected readonly formContact: FormGroup<ContactFormType> =
    new FormGroup<ContactFormType>({
      name: new FormControl(null, Validators.required),
      number: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });

  protected valueChanges$: Observable<void> = merge(
    this.formContact.controls.number.valueChanges,
    this.formContact.controls.name.valueChanges,
    this.formContact.controls.email.valueChanges,
  ).pipe(map(() => void 0));

  public ngOnInit(): void {
    this.valueChanges$.pipe(takeUntil(this.destroy$)).subscribe((): void => {
      if (this.onChange) {
        this.onChange(this.formContact.getRawValue());
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
