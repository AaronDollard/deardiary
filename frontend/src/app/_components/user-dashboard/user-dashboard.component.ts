import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICountry } from 'src/app/_models/country';
import { UserService } from '../../_services/user.service';
import { EntryService } from '../../_services/entry.service';
import {CountryapiService} from '../../_services/countryapi.service'
import { CountryResponseItem } from '../../_models/countryresponse';


@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.css']
})
export class UserDashboardComponent implements OnInit {

  @Input() country: ICountry;

  public err: string;
  username: String='';
  currentUserID: string='';
  countries: ICountry[];
  countryName: string;

  dataCountry: CountryResponseItem[];

  constructor(
    private _user:UserService, 
    private _entry: EntryService, 
    private _router:Router, 
    private _route: ActivatedRoute,
    private _countryapi: CountryapiService) { this.currentUserID = this._user.ObtainID();}

  ngOnInit() {
    this.getAll();
    // this.getCountryData();
    const id = this._route.snapshot.paramMap.get('id');
    this._entry.getCountry(id).subscribe((country: ICountry) => {
      this.country = country;
      this.countryName = this.country.name
      console.log(country.name)
    },
    (error) => {
      this.err = error.message;
    }
    );
  }


// getCountryData(){
//   this.countryName = this.country.name
//   this._countryapi.getCountryData(this.countryName).subscribe
//     (
//       data => {
//         this.dataCountry = data
//         console.log(data);
//       },
//       error => this.err = <any>error
//     );
// }

  getAll(): void {
    this._entry.getAllCountries().subscribe((data: any[]) => {
      this.countries = data || [];
    });
  }

  GetID(data){
    this.currentUserID = data._id;
  }
}
