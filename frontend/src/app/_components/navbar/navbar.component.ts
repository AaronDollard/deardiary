import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt'; 

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  ngOnInit(): void {
  }

  constructor( 
    public AuthService: AuthService,
    public jwtHelper: JwtHelperService
    ) {
  }

  logout(){
    this.AuthService.logout();
    console.log("logged out successful");
    return false;
  }
}
