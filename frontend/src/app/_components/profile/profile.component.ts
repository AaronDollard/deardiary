import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.less']
})
export class ProfileComponent implements OnInit {
  user: object;

  constructor(
    private _router: Router,
    private AuthService: AuthService
  ) { }

  ngOnInit(): void {
    this.AuthService.getProfile().subscribe(
      profile => { this.user = profile.user;
    },
      err => {
        console.log(err);
        return false;
      });
  }

}
