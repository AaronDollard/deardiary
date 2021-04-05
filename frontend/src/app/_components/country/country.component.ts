import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICountry } from 'src/app/_models/country';
import { UserServiceService } from 'src/app/_services/user-service.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Input, Output, EventEmitter } from '@angular/core';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  //updateForm: FormGroup = new FormGroup({
  //  name: new FormControl(null,),
  //  nationality: new FormControl(null),
  //  natLang: new FormControl(null),
  //  note: new FormControl(null)
  //})

  countrylist: ICountry[];
  @Input() country: ICountry;
  message: string;


  constructor(private _router:Router, private route: ActivatedRoute, private _userService: UserServiceService) { }

  ngOnInit() {
    const _id = this.route.snapshot.paramMap.get('_id');
    //Use this user service and call getCountry function to get country _id
    this._userService.getCountry(_id)
      .subscribe((country: ICountry) => {
        //this country is this specific country from the ICountry interface
        this.country = country
      },
        (error: ErrorEvent) => {
          this.message = error.error.message;
       });
  };


  updateCountry(): void {
    this._userService.putCountry(this.country)
      .subscribe(
        //If it is valid, write to console log the values
        data => { console.log(data), this._router.navigate(['/user']);},
        error => console.log(error)
      )
  };

    //Function to delete the country from the database
    deleteCountry(_id: string) {
      this._userService.removeCountry(this.country._id)
      .pipe(
        mergeMap(() => this._userService.getCountries())
        )
        .subscribe((countrylist: ICountry[]) => {
          this.countrylist = countrylist, this._router.navigate(['/user']);
          this.message = 'Country deleted';
        },
        (error: ErrorEvent) => {
        this.message = error.error.message;
        });
      }
}

