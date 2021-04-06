import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '@app/_services/user.service';
import { JwtHelperService } from '@auth0/angular-jwt'; 

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user:object;
  
  ngOnInit(): void {
  }

  constructor( 
    public jwtHelper: JwtHelperService,
    public _router: Router,
    public userService: UserService,
    
    ) {}

    logout() {
      this.userService.logout();
      this._router.navigate(["/login"]);
    }


}
