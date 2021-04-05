import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from "rxjs/operators";
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';
import { JwtHelperService  } from '@auth0/angular-jwt';

const BASE_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(
    private http:HttpClient,
    public jwtHelper: JwtHelperService
    ) { }

  registerUser(user): Observable<any> {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>( BASE_URL + 'user/register', user, httpOptions);
  }

  //returns token of succesful user login
  authenticateUser(user) {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>( BASE_URL + 'user/authenticate', user, httpOptions);
  }

  //get a users profile
  getProfile() {
    this.loadToken();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authToken
    });
    console.log(this.user)
    return this.http.get<any>( BASE_URL + 'user/profile', {headers: headers});
  }


  //store user data
  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  //load the token for a user from local storage
  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  //Check to see if a user is logged in
  loggedIn(){
    if(this.authToken == null){return false;}
    else{return true;}
  }

  //logout
  logout(){
    this.authToken = null,
    this.user = null,
    localStorage.clear();
  }
}
