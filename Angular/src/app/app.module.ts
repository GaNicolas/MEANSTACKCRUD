import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
//Component
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PangolinComponent } from './pangolin/pangolin.component';
import { SignUpComponent } from './pangolin/sign-up/sign-up.component';
//routes
import { appRoutes } from './routes';
import { PangolinProfileComponent } from './pangolin-profile/pangolin-profile.component';
import { SignInComponent } from './pangolin/sign-in/sign-in.component';
import { PangolinService } from './shared/pangolin.service';

import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { PangolinProfileEditComponent } from './pangolin-profile-edit/pangolin-profile-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    PangolinComponent,
    SignUpComponent,
    PangolinProfileComponent,
    SignInComponent,
    PangolinProfileEditComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },AuthGuard, PangolinService],
  bootstrap: [AppComponent]
})
export class AppModule { }
