import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '@app/_services/user.service';
import { ValidateService } from '@app/_services/validate.service';

@Component({
  selector: 'app-adminregister',
  templateUrl: './adminregister.component.html',
  styleUrls: ['./adminregister.component.less']
})
export class AdminregisterComponent implements OnInit {

  hide1 = true;
  hide2 = true;

  registerForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    username: new FormControl(null, Validators.required),
    password: new FormControl(null, Validators.required),
    cpass: new FormControl(null, Validators.required),
  });

  constructor(
    private _router: Router,
    private ValidateService: ValidateService,
    private UserService: UserService
  ) { }

  ngOnInit(): void {
  }

  register() {
      if (!this.ValidateService.validateRegister(this.registerForm)) {
        return false;
      }
      if (
        !this.ValidateService.validateRegisterPassword( this.registerForm.controls.password.value)) {
        return false;
      }

      if (!this.ValidateService.validateEmail(this.registerForm.controls.email.value)) {
        return false;
      }
      this.UserService
        .register(JSON.stringify(this.registerForm.value))
        .subscribe(
          (data) => {
            if ((data as any).success) {
              this._router.navigate(["/login"]);
            }
          },
          (error) => {
          }
        );
    }
};