import { Directive, Input } from '@angular/core';
import { NG_VALIDATORS, AbstractControl, Validators, NgModel } from '@angular/forms';

@Directive({
  selector: '[appPasswordValidator]',
  providers: [{provide: NG_VALIDATORS, useExisting: PasswordValidatorDirective, multi: true}]
})
export class PasswordValidatorDirective implements Validators {
  @Input() appPasswordValidator: string;

  validate(control: AbstractControl): {[key: string]: any; } {
    const passRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    const password = control.value;
    let passed = passRegex.test(password);
    passed = this.appPasswordValidator ? passed && (this.appPasswordValidator === password) : passed;
    return !passed ? {password: 'Invalid password'} : null;
  }

  constructor() { }

}
