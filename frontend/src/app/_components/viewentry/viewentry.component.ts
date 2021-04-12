import { Component, Input, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICountry } from '@app/_models/country';
import { EntryService } from '@app/_services/entry.service';
import { UserService } from '@app/_services/user.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-viewentry',
  templateUrl: './viewentry.component.html',
  styleUrls: ['./viewentry.component.less']
})
export class ViewentryComponent implements OnInit {

  @Input() country: ICountry;

  public err: string;
  username: String='';
  currentUserID: string='';
  countries: ICountry[];

  constructor(
    private _user:UserService, 
    private _entry: EntryService, 
    private _router:Router, 
    private _route: ActivatedRoute) { this.currentUserID = this._user.ObtainID();}

  ngOnInit() {
    this.getAll();
    const id = this._route.snapshot.paramMap.get('id');
    this._entry.getCountry(id).subscribe((country: ICountry) => {
      this.country = country;
      console.log(country.name)
    },
    (error) => {
      this.err = error.message;
    }
    );
  }

  getAll(): void {
    this._entry.getAllCountries().subscribe((data: any[]) => {
      this.countries = data || [];
    });
  }

  GetID(data){
    this.currentUserID = data._id;
  }

  save(f: NgForm) {
    this._entry.updateCountry(this.country, f.value).subscribe();
    this._router.navigate(['profile']);
  }

  onSubmit(f: NgForm) {
    this.currentUserID = this._user.ObtainID();
    this._entry.makeCountry(this.currentUserID, f.value).subscribe((data) => {
      f.resetForm();
      console.log(data);
      this._router.navigate(['profile']);
    });
  }
}
