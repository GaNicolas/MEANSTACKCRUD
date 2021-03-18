import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { PangolinService } from '../shared/pangolin.service';

declare var M : any;

@Component({
  selector: 'app-pangolin-profile-edit',
  templateUrl: './pangolin-profile-edit.component.html',
  styleUrls: ['./pangolin-profile-edit.component.css']
})
export class PangolinProfileEditComponent implements OnInit {
  showSuccessMessage: boolean = false;
  serverErrorMessage: string = "";
  pangolinDetails:any;
  constructor(public pangolinService: PangolinService, private router: Router) { }


  ngOnInit(): void {
    this.pangolinService.getPangolinProfile().subscribe(
      res=>{
        const myObj: {[index: string]:any} =res;
        this.pangolinDetails = myObj['user'];
        this.pangolinService.selectedPangolin = this.pangolinDetails;
      },
      err=>{
        console.log("erreur");
      }
    );
  }

  onCancel(form: NgForm){
    this.resetForm(form);
    this.router.navigate(['/pangolinprofile']);
  }

  resetForm(form?: NgForm){
    if(form)
    form.reset();
    this.pangolinService.selectedPangolin={
      _id:'',
      login:"",
      age:null as any,
      race:"",
      nourriture:"",
      password:"",
      friends:Array as any
    }
  }

  onSubmit(form:NgForm){
    this.pangolinService.putPangolin(form.value).subscribe((res)=>{
      this.resetForm(form);
      this.router.navigate(['/pangolinprofile']);
    });
  }
}
