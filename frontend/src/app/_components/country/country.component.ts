import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../_services/user.service';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Input, Output, EventEmitter } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { environment } from '@environments/environment';
import { EntryService } from '@app/_services/entry.service';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})

export class CountryComponent implements OnInit {


  constructor(
    private _router:Router, 
    private route: ActivatedRoute, 
    private _userService: UserService,
    private _entryService: EntryService) { }

  ngOnInit() {
  };

}