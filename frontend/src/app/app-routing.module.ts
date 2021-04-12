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
    //{path:'dashboard/update/:id', component:AdmindashboardupdateComponent, canActivate: [ManagerGuard]},
    //{path:'admin', component:StaffPageComponent, canActivate: [StaffGuard]},

    {path:'login', component:LoginComponent},
    {path:'register', component:RegisterComponent},

    {path:'countries', component: UserDashboardComponent, canActivate: [AuthGuard] },

    {path:'profile', component: ProfileComponent },
    {path:'profile/view/:id', component: ViewentryComponent },
    
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
