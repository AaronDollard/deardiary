import { Component, OnInit } from '@angular/core';
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
    public jwtHelper: JwtHelperService
    ) {
  }
}
