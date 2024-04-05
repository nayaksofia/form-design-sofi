import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { RouterModule, Routes } from '@angular/router'; //Add
import { FormsModule } from '@angular/forms'; //Add
import { HttpClient, HttpClientModule} from '@angular/common/http'; //Add

//Configure Routes
const routes:Routes=[
  {path:'',redirectTo:'/addUs',pathMatch:'full'},
  {path:'view',component:ViewUserComponent},
  {path:'addUs',component:AddUserComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    AddUserComponent,
    ViewUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, //Add
    FormsModule, //Add
    RouterModule.forRoot(routes) //Add
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
