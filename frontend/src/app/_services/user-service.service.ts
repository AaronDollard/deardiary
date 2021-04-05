import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { ICountry } from '../_models/country';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'
import { environment } from '@environments/environment';
import { IUser } from "../_models/user"

const BASE_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  currentUser: IUser = {
    _id: null,
    username: null,
  };

  constructor(private _http: HttpClient) { }

//BELOW IS FOR LOGIN AND REGISTRATION OF USERS
registerUser(body: any) {
  return this._http.post( BASE_URL + "user", body, {
    observe: 'body',
    headers: new HttpHeaders().append('Content-Type', 'application/json')
  });
}

userLogin(body: any): Observable<IUser> {
  return this._http.post( BASE_URL + "users", body, {
      observe: "body",
      headers: new HttpHeaders().append("Content-Type", "application/json"),
    })
    .pipe(
     map((response: any) => {
      const user = response;

      //if the returned status message is success, do
      if (user.success) {

        this.currentUser._id = user._id;
        this.currentUser.username = user.username;
        return this.currentUser;
      }
    }, catchError(this.handleError))
  )}



//###########################################
//###########################################
  getCountries(): Observable<ICountry[]> {
    console.log("GetCountries called and displaying DB!" );
    return this._http.get<ICountry[]>(BASE_URL + "countries")
      .pipe(
        catchError(this.handleError)
      )
  }

//Get specific country
  getCountry(_id: string): Observable<ICountry> {
    return this._http.get<ICountry>(BASE_URL + "countries" + `/${_id}`)
  }

  //Posts country to DB
  postCountry(body: any) { //Uses the API to send the form to MongoDB to log the country
    return this._http.post( BASE_URL + "countries", body, {
      observe: 'body',
      headers: new HttpHeaders().append('Content-Type', 'application/json')
    });
  }

  //Update the country
  putCountry(country: ICountry): Observable<any> {
    return this._http.put(BASE_URL + "countries" + `/${country._id}`, country);
  }


  //Remove the country from the database
  removeCountry(_id: string): Observable<any> {
    return this._http.delete(BASE_URL + "countries" + `/${_id}`);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
