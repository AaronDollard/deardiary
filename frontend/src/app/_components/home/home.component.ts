import { Component, OnInit } from '@angular/core';
import { AuthService } from '@app/_services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: object;

  constructor(
    public AuthService: AuthService,
  ) { }

  ngOnInit(): void {
  }

}
