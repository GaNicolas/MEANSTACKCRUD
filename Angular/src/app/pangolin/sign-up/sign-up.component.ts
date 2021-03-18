import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { PangolinService } from '../../shared/pangolin.service';

declare var M:any;

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {


  showSuccessMessage: boolean = false;
  serverErrorMessage: string = "";
  constructor(public pangolinService:PangolinService, private router : Router) { }

  ngOnInit(): void {
  }

  onSubmit(form : NgForm){
    this.pangolinService.postPangolin(form.value).subscribe(
      res => {
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 4000);
        setTimeout(() =>  this.router.navigateByUrl('/login'),4000);
        this.resetForm(form);
      },
      err => {
        if(err.status == 422){
          this.serverErrorMessage = err.error.join('<br/>');
        }
      }
    );
  }

  resetForm(form: NgForm){
    this.pangolinService.selectedPangolin = {
      _id:'',
      login: '',
      password: '',
      age:null as any,
      race:'',
      nourriture:'',
      friends:null as any
    };
    form.resetForm();
    this.serverErrorMessage='';
  }
}
