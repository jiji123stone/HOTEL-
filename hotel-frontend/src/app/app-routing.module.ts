import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddRoomComponent } from './add-room/add-room.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';

const routes: Routes = [
   
  { path: '', component: LoginComponent }, // par défaut page login
  { path: 'user/:id', component: UserPageComponent } ,// page après login
  { path: 'add-room', component: AddRoomComponent },
  { path: 'admin', component: AdminPageComponent },


  
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
