import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { error } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CountryResponseItem } from '../_models/countryresponse';

@Injectable({
  providedIn: 'root'
})
export class CountryapiService {

  private _url: string = "https://restcountries.eu/rest/v2/name/"

  constructor(private _http: HttpClient) { }

  //Writes the items as one object or string into the console.log
  public getCountryData(countryName): Observable<CountryResponseItem[]> {
    return this._http.get<CountryResponseItem[]>(this._url + countryName)
    .pipe(
      tap(data => console.log(JSON.stringify(data))
      ),
      catchError(this.handleError)
    );
  }

  private handleError(error:HttpErrorResponse) {
    console.log('API: ' + error.message);
    return Observable.throw(error.message)
    }
}