import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//Used for form
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserService } from '../../_services/user.service';
import { ValidateService } from '../../_services/validate.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  //booleans for showing/hiding passwords
  hide1 = true;
  hide2 = true;

  //Register FormGroup
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
    // (validate that the entered password is a valid password)
      if (
        !this.ValidateService.validateRegisterPassword( this.registerForm.controls.password.value)) {
        return false;
      }

    // (validate that the entered email is a valid email)
      if (!this.ValidateService.validateEmail(this.registerForm.controls.email.value)) {
        return false;
      }
    // (subscribe to the register method on the user service to log in)
      this.UserService
        .register(JSON.stringify(this.registerForm.value))
        .subscribe(
          (data) => {
          // (if the boolean "success" returns true, display the returned message to the user and redirect them to the 'user' page)
            if ((data as any).success) {
              this._router.navigate(["/login"]);
            }
          // (if there is an error display the returned error message to the user)
          },
          (error) => {
          }
        );
    }
};