import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-user',
  templateUrl: './view-user.component.html',
  styleUrls: ['./view-user.component.css']
})
export class ViewUserComponent  implements OnInit {

  users:any[] = [];

  message:string='';

  constructor(private http:HttpClient){}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(){
    this.http.get('http://localhost:3000/getUsers')
    .subscribe((response:any)=>
    {this.users=response},
    (error)=>{console.error('Error Fetching the User Informations',error);}
    );
  }

}
