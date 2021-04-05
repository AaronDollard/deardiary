import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@app/_services/auth.service';
import { UserServiceService } from '@app/_services/user-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {
  username:String;
  password:String;

  constructor(
    private _router:Router, 
    private route: ActivatedRoute, 
    private UserServiceService: UserServiceService,
    private AuthService: AuthService) { }

  ngOnInit(): void {
  }

  onLoginSubmit(){
    const user = {
      username: this.username,
      password: this.password
    }

    this.AuthService.authenticateUser(user).subscribe(data => {
      if(data.success){
        this.AuthService.storeUserData(data.token, data.user),
        console.log("You are logged in")
        this._router.navigate(['home'])
      } else{
        console.log(data.msg)
      }
    });
  }
}
