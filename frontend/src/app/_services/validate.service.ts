import { Injectable } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  registerForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    cpass: new FormControl(null, Validators.required),
  });


  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, Validators.required),
  });


  constructor() { }

  validateRegister(_registerForm) {
    this.registerForm = _registerForm;
    if (
      !this.registerForm.controls.email.valid &&
      !this.registerForm.controls.username.valid &&
      !this.registerForm.controls.password.valid &&
      !this.registerForm.controls.cpass.valid
    ) {

      return false;
    } else if (
      !this.registerForm.controls.email.valid &&
      !this.registerForm.controls.username.valid
    ) {

      return false;
    } else if (
      !this.registerForm.controls.username.valid &&
      !this.registerForm.controls.password.valid
    ) {

      return false;
    } else if (
      !this.registerForm.controls.username.valid &&
      !this.registerForm.controls.cpass.valid
    ) {

      return false;
    } else if (!this.registerForm.controls.username.valid) {

      return false;
    } else if (!this.registerForm.controls.email.valid) {

      return false;
    } else if (
      !this.registerForm.controls.password.valid ||
      !this.registerForm.controls.cpass.valid
    ) {

      return false;
    } else if (
      this.registerForm.controls.password.value !=
      this.registerForm.controls.cpass.value
    ) {

      return false;
    } else if (!this.registerForm.valid) {

      return false;
    } else {
      return true;
    }
  }

  validateEmail(email) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
  }

// (validate that the entered password is a valid password)
  validateRegisterPassword(password) {
  // Minimum eight characters, maximum 30, letters and numbers:
    const regex = /^[A-Za-z\d]{8,30}$/;
    return regex.test(password);
  }

// (validate that all required form fields have been filled in)
  validateLogin(_loginForm) {
    this.loginForm = _loginForm;
    if (
      !this.loginForm.controls.email.valid &&
      !this.loginForm.controls.password.valid
    ) {

      return false;
    } else if (!this.loginForm.controls.email.valid) {

      return false;
    } else if (!this.loginForm.controls.password.valid) {

      return false;
    } else {
      return true;
    }
  }
}
