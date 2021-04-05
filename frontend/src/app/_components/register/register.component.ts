import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
//Used for form
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UserServiceService } from '@app/_services/user-service.service';
import { ValidateService } from '../../_services/validate.service';
import { AuthService } from '../../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less']
})
export class RegisterComponent implements OnInit {

  username: string;
  email: string;
  password: string

  constructor(
    private _router: Router,
    private ValidateService: ValidateService,
    private AuthService: AuthService
  ) { }

  ngOnInit(): void {
  }

  //Register user
  onRegisterSubmit() {
    const user = {
      username: this.username,
      email: this.email,
      password: this.password
    }
    //validate all fields are filled
    if (!this.ValidateService.validateRegister(user)) {
      console.log("All fields are required");
      return false;
    }

    //validate email bein used
    if (!this.ValidateService.validateEmail(this.email)) {
      console.log("Enter a valid email");
      return false;
    }

    //register the user
    this.AuthService.registerUser(user).subscribe(data => {
      if (data.success) {
        console.log("you are registered")
        this._router.navigate(['/login'])
      }
    });
  }
};