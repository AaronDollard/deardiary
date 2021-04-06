import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICountry } from 'src/app/_models/country';
import { UserService } from '../../_services/user.service';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  //Country list for displaying
  countrylist: ICountry[];
  searchFilter: string;
  message: string;

  constructor(private _router: Router, private _userService: UserService) { }

  ngOnInit(): void {
  }


}

