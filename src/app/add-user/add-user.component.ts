import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { response } from 'express';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  FirstName:string ='';
  LastName: string ='';
  PreferredName : string='';
  Pronouns: string='';
  EmailAddressWork:string='';
  PhoneNumber:number= 0 ;
  FaxNumber:number =0;
  Department: string='';
  message:string='';

  //Create Object To HTTPClient
  constructor(private http:HttpClient){}

ngOnInit(): void {
  
}

addUser(){
  //Create a json object
  const user={
    FirstName: this.FirstName,
    LastName: this.LastName,
    PreferredName: this.PreferredName,
    Pronouns: this.Pronouns,
    EmailAddressWork:this.EmailAddressWork,
    PhoneNumber: this.PhoneNumber,
    FaxNumber: this.FaxNumber,
    Department:this.Department

  };

  //Send to localhost 3000
  this.http.post('http://localhost:3000/addUser',user)
  .subscribe((response:any)=>{this.message = response.message},
  (error)=> {console.error('Error adding the user information',error);}
  );
 }

}
