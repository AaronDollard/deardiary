import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
//Components
import { AppComponent } from './app.component';
import { UserFormComponent } from '../app/_components/user-form/user-form.component';
import { UserDashboardComponent } from '../app/_components/user-dashboard/user-dashboard.component';
import { NavbarComponent } from '../app/_components/navbar/navbar.component';
import { CountryComponent } from '../app/_components/country/country.component';
import { RegisterComponent } from './_components/register/register.component';
import { LoginComponent } from './_components/login/login.component'
import { ProfileComponent } from './_components/profile/profile.component'
//extras
import { JwtModule } from '@auth0/angular-jwt';
import { RouterModule, Routes } from '@angular/router';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

//services
import { UserService } from './_services/user.service';
import { ValidateService } from './_services/validate.service';
import { AuthGuard } from './_guards/auth.guard';
import { HomeComponent } from './_components/home/home.component';



const appRoutes: Routes = [
    {path:'form', component: UserFormComponent, canActivate:[AuthGuard]},
    {path:'user', component: UserDashboardComponent, canActivate:[AuthGuard]},
    {path:'country', component: CountryComponent, canActivate:[AuthGuard]},
    {path:'register', component: RegisterComponent},
    {path:'login', component: LoginComponent},
    {path:'profile', component: ProfileComponent, canActivate:[AuthGuard] }
  ]

  //Used for guards
  export function tokenGetter(){ 
    return localStorage.getItem("token");
}

@NgModule({
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserModule,
        AppRoutingModule,
        RouterModule.forRoot(appRoutes), //Used for routes
        FormsModule, //Needed for user country form
        ReactiveFormsModule, //Needed for user country form
        Ng2SearchPipeModule, //used for searching import
        JwtModule, //Checks to see if a user is logged in
        BrowserAnimationsModule,
        JwtModule.forRoot({config: {tokenGetter: tokenGetter}}),
    ],
    declarations: [
        AppComponent,
        UserFormComponent,
        UserDashboardComponent,
        NavbarComponent,
        CountryComponent,
        RegisterComponent,
        LoginComponent,
        ProfileComponent,
        HomeComponent
    ],
    providers: [ UserService, ValidateService, AuthGuard ],
    bootstrap: [ AppComponent]
})
export class AppModule { }