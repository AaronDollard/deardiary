import { Component, OnInit } from '@angular/core';
import { UserService } from '@app/_services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  user: object;

  constructor(
    public userService: UserService
  ) { }

  ngOnInit(): void {
  }

}
