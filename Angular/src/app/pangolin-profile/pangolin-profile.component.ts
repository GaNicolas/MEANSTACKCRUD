import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms'


import { PangolinService } from '../shared/pangolin.service';
import { Router } from '@angular/router';
import { Pangolin } from '../shared/pangolin.model';

@Component({
  selector: 'app-pangolin-profile',
  templateUrl: './pangolin-profile.component.html',
  styleUrls: ['./pangolin-profile.component.css']
})
export class PangolinProfileComponent implements OnInit {
  pangolinDetails: any;
  pangoTemp!: Array<Pangolin>;
  index:number=0;
  serverErrorMessage: string = "";
  showSuccessMessage: boolean = false;
  showErrorMessage: boolean = false;

  constructor(public pangolinService: PangolinService, private router : Router) { }




  pango: Pangolin = {
    _id:'',
    login:'',
    password:'123',
    age:'' as any,
    race:'',
    nourriture:'',
    friends:null as any
  };




  ngOnInit(): void {
    this.pangolinService.getPangolinProfile().subscribe(
      res=>{
        const myObj: {[index: string]:any} = res;
        this.pangolinDetails = myObj['user'];
        this.pangolinService.friends = this.pangolinDetails['friends'];
        this.refreshFriendList();
        this.refreshPangolinList();
      },
      err=>{
        console.log("erreur");
      }
    );
  }

  refreshPangolinList(){
    this.pangolinService.getPangolinList().subscribe((res)=>{
      this.pangolinService.pangolins = [];
      this.pangoTemp = res as Pangolin[];
      let boucle = this.pangoTemp.length;
      for(let i = 0; i < boucle ; i++){
        if(this.pangolinDetails._id != this.pangoTemp[i]._id){
        if(!this.pangolinService.friends.find(e => e._id == this.pangoTemp[i]._id) && !this.pangolinService.pangolins.find(x => x._id == this.pangoTemp[i]._id))
          this.pangolinService.pangolins.push(this.pangoTemp[i]);
      }
    }
    });
  }

  refreshFriendList(){

    this.pangolinService.friends = this.pangolinDetails['friends'];
  }

  onRemove(pango : Pangolin){
    this.index =  this.pangolinDetails['friends'].indexOf(pango,0);
    if ( this.index > -1){
      this.pangolinDetails['friends'].splice(this.index,1);
    }
    this.pangolinService.putPangolin(this.pangolinDetails).subscribe((res)=>{
      this.refreshFriendList();
      this.refreshPangolinList();
    });
  }

  onSubmit(form:NgForm){
    this.pangolinService.postPangolin1(this.pango).subscribe(
      res => {
        this.resetForm(form);
        this.refreshFriendList();
        this.refreshPangolinList();
        this.showSuccessMessage = true;
        setTimeout(() => this.showSuccessMessage = false, 4000);
      },
      err => {
        if(err.status == 422){
          this.serverErrorMessage = err.error.join('<br/>')
          this.showErrorMessage = true;
          setTimeout(() => this.showErrorMessage = false, 4000);
        }
      }
    );
  }

  onAdd(pango:Pangolin){
    this.pangolinDetails['friends'].push(pango);
    this.pangolinService.putPangolin(this.pangolinDetails).subscribe((res)=>{
      this.refreshFriendList();
      this.refreshPangolinList();
  });
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

}

  onEdit(){
    this.router.navigate(['/edit']);
  }

  onLogout(){
    this.pangolinService.deleteToken();
    this.router.navigate(['/login']);
  }
}
