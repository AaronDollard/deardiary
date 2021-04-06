import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICountry } from '@app/_models/country';
import { EntryService } from '@app/_services/entry.service';
import { UserService } from '@app/_services/user.service';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public entry: ICountry;
  public entries: ICountry[];
  
  username: String = "";
  userId: string = "";
  public error: string;
  public errorMsg: string;
  public successMsg: string;

  public columns = ["name", "nationality", "language"];
  searchFilter: string;

  constructor(
    private _router: ActivatedRoute,
    private entryService: EntryService,
    private _user: UserService
  ) { }

  ngOnInit() {
    this.getTheEntries();
  }
  
  getTheEntries() {
    this.userId = this._user.ObtainID();
    this.entryService.getCountries(this.userId).subscribe(
      (entry: ICountry) => {
        this.entry = entry;
      },
      (error) => {
        this.error = error.message;
      }
    );
  }

  cancelBooking(id: string) {
    this.entryService
      .cancelCountry(id)
      .pipe(mergeMap(() => this.entryService.getCountriesForCancel()))
      .subscribe(
        (entries: ICountry[]) => {
          this.entries = entries;
          this.successMsg = "Entry Deleted";
        },
        (error: ErrorEvent) => {
          this.errorMsg = error.error.message;
        }
      );
    this.getTheEntries();
  }
}