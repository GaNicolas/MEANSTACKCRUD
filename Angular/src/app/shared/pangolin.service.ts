import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../environments/environment';
import { Pangolin } from './pangolin.model';



@Injectable({
  providedIn: 'root'
})
export class PangolinService {
  selectedPangolin: Pangolin = {
    _id:'',
    login:'',
    password:'',
    age:'' as any,
    race:'',
    nourriture:'',
    friends:null as any
  };

  pangolins!:Pangolin[];
  friends!:Pangolin[];

  noAuthHeader = { headers : new HttpHeaders({'NoAuth': 'True'})}

  constructor(private http: HttpClient) {

  }

  postPangolin(pangolin: Pangolin){
    return this.http.post(environment.apiBaseUrl+'/register',pangolin, this.noAuthHeader);
  }


  postPangolin1(pangolin: Pangolin){
    return this.http.post(environment.apiBaseUrl+'/userProfile',pangolin);
  }

  login(authCredentials: any){
    return this.http.post(environment.apiBaseUrl+'/authenticate', authCredentials, this.noAuthHeader);
  }

  getPangolinProfile(){
    return this.http.get(environment.apiBaseUrl+'/userProfile');
  }

  getPangolinList(){
  return this.http.get('http://localhost:3000/users/');
  }


putPangolin(pango : Pangolin){
  return this.http.put('http://localhost:3000/users'+`/${pango._id}`,pango);
}





  setToken(token: string){
    localStorage.setItem('token', token);
  }
  deleteToken(){
    localStorage.removeItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  getPangolinPayload(){
    var token = this.getToken();

    if(token){
      var pangolinPayload = atob(token.split('.')[1]);
      return JSON.parse(pangolinPayload);
    }
    else
      return null;
  }
  isLoggedIn(){
    var pangolinPayload = this.getPangolinPayload();
    if(pangolinPayload)
      return pangolinPayload.exp > Date.now() / 1000;
    else
      return false;
  }
}
