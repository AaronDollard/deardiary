import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  hide = true;

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.email, Validators.required]),
    password: new FormControl(null, Validators.required),
  });

  constructor(
    private _router:Router, 
    private _userService: UserService) { }

  ngOnInit(): void {
  }

  login() {

    // (subscribe to the register method on the user service to log in)
    this._userService.login(JSON.stringify(this.loginForm.value)).subscribe(
      (response) => {
        console.log("Entered the success method in the login component");
        this._router.navigate(["/home"]);
      },
      (error) => {
      }
    );
  }

}
