import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { environment } from "../../environments/environment";
import { IUser } from "../_models/user";
import { catchError, map } from "rxjs/operators";
import { JwtHelperService } from "@auth0/angular-jwt";

const BASE_URL = environment.apiUrl;

export const InterceptorSkipHeader = 'X-Skip-Interceptor';

@Injectable({
  providedIn: 'root'
})

export class UserService {
  BASE_URL = environment.apiUrl;
  authToken: any;
  user: any;
  userLogged: any;
  CurrentUser: IUser;
  CredentialsUsed = false;
  id: string;
  role: string;
  username: string;
  success: boolean;
  TokenForIdentification:any;
  helper = new JwtHelperService();
  jwtHelper: JwtHelperService;


  currentUser: IUser = {
    _id: null,
    username: null,
    email: null,
    role: null,
  };

  constructor(
    private _http: HttpClient
  ) { }

 ngOnInit() {}

register(body: any) {
  //return this._http.get(`${this.BASE_URL}/users/register`,{
  return this._http
    .post<any>( BASE_URL + "user/register-user", body, {
      observe: "body",
      headers: new HttpHeaders().append("Content-Type", "application/json").append(InterceptorSkipHeader, ''),
    })
    .pipe(catchError(this.handleError));
}

login(body: any): Observable<IUser> {
  return this._http
    .post( BASE_URL + "user/login", body, {
      observe: "body",
      headers: new HttpHeaders().append("Content-Type", "application/json").append(InterceptorSkipHeader, ''),
    })
    .pipe(
      map((response: any) => {
        const user = response;

        //if the returned status message is success, do
        if (user.success) {
          localStorage.setItem("token", user.token);
          const decodedToken = this.helper.decodeToken(response.token);

          this.currentUser._id = decodedToken.user_id;
          this.currentUser.username = decodedToken.username;
          this.currentUser.role = decodedToken.role;
          this.ObtainID();
          this.ObtainRole();
          return this.currentUser;
        }
      }, catchError(this.handleError))
    );
}

ObtainID() {
  this.TokenForIdentification = this.helper.decodeToken(localStorage.getItem("token"));
  this.id = this.TokenForIdentification.user_id;
  return this.id;
}

ObtainRole() {
  this.TokenForIdentification = this.helper.decodeToken(localStorage.getItem("token"));
  if(this.TokenForIdentification == null){
    return this.role = "";
  }
  else{
     this.role = this.TokenForIdentification.role;
     return this.role;
  }
}

getUserName() {
  this.TokenForIdentification = this.helper.decodeToken(localStorage.getItem("token"));
  if(this.TokenForIdentification == null){
    return this.username = "";
  }
  else{
     this.username = this.TokenForIdentification.username;
     return this.username;
  }
}

getEntries(id: string): Observable<IUser> {
  return this._http.get<IUser>(`${this.BASE_URL}/user/${id}/country`);
}

loggedIn(){
  this.loadToken();
  const helper = new JwtHelperService();
  return helper.isTokenExpired(this.authToken);
}

isLoggedOut() {
  return !this.loggedIn();
}

loadToken() {
  const token = localStorage.getItem("token");
  this.authToken = token;
}

returnToken(){
  const token = localStorage.getItem("token");
  this.authToken = token;
  return this?.authToken;
}

logout() {
  this.authToken = null;
  this.userLogged = null;
  localStorage.clear();
}
handleError(err) {
  return throwError(err);
}
}
