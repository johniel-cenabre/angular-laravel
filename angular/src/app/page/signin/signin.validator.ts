import { Injectable } from '@angular/core';
import { FormGroup, ValidatorFn } from '@angular/forms';
import { UnAuthGuard } from 'src/app/auth/unauth.guard';

@Injectable({
  providedIn: 'root'
})
export class SigninValidator {
  
  matchPassword(getAction: Function): any {
    return (formGroup: FormGroup) => {
      const password = formGroup.get('password');
      const confirmPassword = formGroup.get('confirmPassword');
      const errors = confirmPassword?.errors;

      if (getAction() !== 'register') return confirmPassword?.setErrors(null);

      if (errors) return null;

      if (password?.value !== confirmPassword?.value) {
        confirmPassword?.setErrors({ missmatch: true });
      } else {
        confirmPassword?.setErrors(null);
      }
    }
  }
}
