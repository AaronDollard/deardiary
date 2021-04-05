import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICountry } from 'src/app/_models/country';
import { UserServiceService } from 'src/app/_services/user-service.service';


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

  constructor(private _router: Router, private _userService: UserServiceService) { }

  ngOnInit(): void {

    this._userService.getCountries().subscribe({
      next: (value: ICountry[]) => this.countrylist = value,
      complete: () => console.log('Country Service finished'),
      error: (mess) => this.message = mess
    })

  }


}

