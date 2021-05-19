import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { FadeInOut, SlideDownUp } from 'src/app/animations';
import { AuthService } from 'src/app/auth/auth.service';
import { SigninValidator } from './signin.validator'

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  animations: [SlideDownUp, FadeInOut],
})
export class SigninComponent implements OnInit {
  form: FormGroup;
  action: string = 'login';
  passwordIsHidden: boolean = true;
  isSubmitted: boolean = false;

  constructor(
    private validator: SigninValidator,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  get email() { return this.form.get('email'); }
  
  get password() { return this.form.get('password'); }

  get confirmPassword() { return this.form.get('confirmPassword'); }

  ngOnInit() {
    this.form = new FormGroup({
      'email' : new FormControl(null, [Validators.required, Validators.email]),
      'password' : new FormControl(null, [Validators.required]),
      'confirmPassword' : new FormControl(null, [Validators.required])
    }, {
      validators: [this.validator.matchPassword(() => this.action)],
      updateOn: 'change',
    });
  }

  changeAction(action: string) {
    this.form.reset();
    this.isSubmitted = false;
    this.action = action;
  }

  submit() {
    this.isSubmitted = true;

    if (this.form.invalid) return;
    if (this.action === 'login') this.login();
    if (this.action === 'register') this.register();
  }

  login() {
    this.auth.login(this.form).subscribe(
      response => {
        localStorage.removeItem('currentUser');
        localStorage.setItem('currentUser', JSON.stringify(response));
        console.log('user is authenticated'); // temp
      },
      error => {
        localStorage.removeItem('currentUser');
        this.email?.setErrors({ incorrect: true });
        this.password?.setErrors({ incorrect: true });
      },
    );
  }

  register() {
    // this.auth.register(this.form).subscribe(
    //   response => {
    //     localStorage.removeItem('token');
    //     localStorage.setItem('token', response.token);
    //     this.router.navigate(['']);
    //   },
    //   error => {
    //     localStorage.removeItem('token');
    //     this.errors = error.error;
    //   }
    // );
  }

  resetValidation() {
    if (this.email?.errors?.incorrect) {
      this.email?.reset(this.email.value);
    }
    if (this.password?.errors?.incorrect) {
      this.password?.reset(this.password.value);
    }
    if (this.confirmPassword?.errors?.incorrect) {
      this.confirmPassword?.reset(this.confirmPassword.value);
    }
  }

}
