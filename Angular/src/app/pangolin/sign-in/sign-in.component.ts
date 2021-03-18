import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'
import { Router } from '@angular/router';

import { PangolinService } from '../../shared/pangolin.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor( private pangolinService : PangolinService, private router : Router) { }

  model = {
    login:'',
    password:''
  };

  serverErrorMessage: string ='';
  ngOnInit(): void {
    if(this.pangolinService.isLoggedIn())
    this.router.navigateByUrl('/pangolinprofile');
  }

  onSubmit(form : NgForm){
    this.pangolinService.login(form.value).subscribe(
      res => {
        const myObj: {[index: string]:any} =res;
        this.pangolinService.setToken(myObj['token']);
        this.router.navigateByUrl('/pangolinprofile');
      },
      err => {
        this.serverErrorMessage = err.error.message;
      }
    );
  }

}
