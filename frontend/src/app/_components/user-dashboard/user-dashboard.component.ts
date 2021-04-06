import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICountry } from 'src/app/_models/country';
import { UserService } from '../../_services/user.service';
import { EntryService } from '../../_services/entry.service';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  constructor( 
    private _userService: UserService,
    private _entryService: EntryService) { }

  ngOnInit(): void {
  }


}

