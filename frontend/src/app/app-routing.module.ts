import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryComponent } from '../app/_components/country/country.component';
import { UserDashboardComponent } from '../app/_components/user-dashboard/user-dashboard.component';
import { LoginComponent } from './_components/login/login.component';
import { ProfileComponent } from './_components/profile/profile.component';
import { RegisterComponent } from './_components/register/register.component';
import { HomeComponent } from './_components/home/home.component';
import { UserFormComponent } from './_components/user-form/user-form.component'
import { AuthGuard } from './_guards/auth.guard';


const routes: Routes = [
    //Protected routes
    {path: "user/:_id", component: CountryComponent, canActivate:[AuthGuard] }, //used when click update on a country from the list
    {path:'form', component: UserFormComponent, canActivate:[AuthGuard] },
    {path:'user', component: UserDashboardComponent, canActivate:[AuthGuard] },
    {path:'country', component: CountryComponent, canActivate:[AuthGuard] },
    {path:'profile', component: ProfileComponent, canActivate:[AuthGuard] },

    //Unprotected routes
    {path:'home', component: HomeComponent},
    {path:'register', component: RegisterComponent},
    {path:'login', component: LoginComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [ AuthGuard ],
})
export class AppRoutingModule { }
