import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { ICountry } from '../_models/country';
import { IUser } from '../_models/user';

const BASE_URL = environment.apiUrl;

@Injectable()
export class EntryService {

  constructor(private http: HttpClient) { }



  makeCountry = (id:string, data) => {
    return this.http.post(BASE_URL + `user/${id}/country`, data);
  };

  getCountries(id: string): Observable<ICountry> {
    return this.http.get<ICountry>(BASE_URL + `user/${id}/country`);
  }

  getCountry(id: string): Observable<ICountry> {
    return this.http.get<ICountry>(BASE_URL + `country/${id}`)
  }
  
  updateCountry(country, data): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.put(BASE_URL + `country/${country._id}`, data, httpOptions).pipe(
      tap(updatedCountry => console.log(`updated country = ${JSON.stringify(updatedCountry)}`)),
    );
  }

  getCountriesForCancel(): Observable<ICountry[]> {
    return this.http.get<ICountry[]>(BASE_URL + `country`)
  }

  cancelCountry(id: string): Observable<any> {
    return this.http.delete(BASE_URL + `country/${id}`);
  }

  getCountriesForAdmin = () => {
    return this.http.get(BASE_URL + "country");
  };

  getAllCountries = () => {
    return this.http.get(BASE_URL + "country/getAll");
  };

  deleteCountry = (id) => {
    return this.http.delete(BASE_URL + "country" + id);
  };

  findCountry = (id) => {
    return this.http.get(BASE_URL + "country" + id);
  };
}
