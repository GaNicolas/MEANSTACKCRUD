import { Routes } from '@angular/router';
import { PangolinComponent } from './pangolin/pangolin.component';
import { SignUpComponent } from './pangolin/sign-up/sign-up.component';
import { SignInComponent } from './pangolin/sign-in/sign-in.component';
import { PangolinProfileComponent } from './pangolin-profile/pangolin-profile.component';
import { PangolinProfileEditComponent } from './pangolin-profile-edit/pangolin-profile-edit.component';

import { AuthGuard } from './auth/auth.guard';



export const appRoutes: Routes = [
  {
    path: 'signup', component: PangolinComponent,
    children: [{path: '', component: SignUpComponent}]
  },
  {
    path:'', redirectTo:'/login', pathMatch:'full'
  },
  {
    path: 'edit', component: PangolinProfileEditComponent, canActivate:[AuthGuard]
  }
  ,
  {
    path: 'login', component: PangolinComponent,
    children: [{path: '', component: SignInComponent}]
  },
  {
    path: 'pangolinprofile', component: PangolinProfileComponent, canActivate:[AuthGuard]

  }
];
