import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CountryComponent } from '../app/_components/country/country.component';
import { UserDashboardComponent } from '../app/_components/user-dashboard/user-dashboard.component';
import { LoginComponent } from './_components/login/login.component';
import { ProfileComponent } from './_components/profile/profile.component';
import { RegisterComponent } from './_components/register/register.component';
import { HomeComponent } from './_components/home/home.component';
import { UserFormComponent } from './_components/user-form/user-form.component'
import { ViewentryComponent } from './_components/viewentry/viewentry.component'
import { AuthGuard } from './_guards/auth.guard';

  const routes: Routes = [
    {path:'home', component:HomeComponent},

    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent},


    {path:'profile', component: ProfileComponent },
    {path:'profile/edit/:id', component: ViewentryComponent },
    {path:'profile/view/:id', component: UserDashboardComponent, canActivate: [AuthGuard] },

    //still need country compnent

    
    {path:'user/diary', component: UserFormComponent, canActivate: [AuthGuard] },

  ];




@NgModule({
    imports: [
      RouterModule.forRoot(routes, { onSameUrlNavigation: 'reload' }),
  ],
    exports: [RouterModule],
    providers: [ AuthGuard ],
})
export class AppRoutingModule { }
