import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from "rxjs/operators";
import { environment } from '@environments/environment';
import { Observable, throwError } from 'rxjs';
import { JwtHelperService  } from '@auth0/angular-jwt';
import { IUser } from '@app/_models/user';

const BASE_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  currentUserID: string;
  tokenID:any;

  helper = new JwtHelperService();
  authToken: any;
  user: any;

  CurrentUser: IUser;
  currentUser: IUser = {
    _id: null,
    username: null,
    email: null,
  };

  constructor(
    private http:HttpClient,
    public jwtHelper: JwtHelperService
    ) { }

  registerUser(user): Observable<any> {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>( BASE_URL + 'user/register', user, httpOptions);
  }

  //returns token of succesful user login
  loginUser(user): Observable<any> {
    let httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<any>( BASE_URL + 'user/login', user, httpOptions)      
    .pipe(
      map((response: any) => {
        const user = response;

        //if the returned status message is success, do
        if (user.success) {
          localStorage.setItem("token", user.token);
          const decodedToken = this.helper.decodeToken(response.token);

          this.currentUser._id = decodedToken.id;
          this.currentUser.username = decodedToken.username;
          this.ObtainID();
          return this.currentUser;
        }
      }, catchError(this.handleError))
    );;
  }

  //get a users profile
  getProfile() {
    this.loadToken();
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': this.authToken
    });
    //console.log(this.user)
    return this.http.get<any>( BASE_URL + 'user/profile', {headers: headers});
  }

  //Obtain ID for current user
  ObtainID() {
    this.tokenID = localStorage.getItem('token');
    this.currentUserID = this.tokenID;
    console.log("This is the current user ID " + this.currentUserID);
    return this.currentUserID; 
  }


  // //store user data
  // storeUserData(token){
  //   localStorage.setItem('token', token);
  //   this.authToken = token;
  // }

  //load the token for a user from local storage
  loadToken(){
    const token = localStorage.getItem('token');
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

  handleError(err) {
    return throwError(err);
  }
}
