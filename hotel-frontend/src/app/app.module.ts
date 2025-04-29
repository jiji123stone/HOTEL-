import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { RoomsComponent } from './rooms/rooms.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchRoomComponent } from './search-room/search-room.component';
import { RoomsAdminComponent } from './rooms-admin/rooms-admin.component';
import { AddRoomComponent } from './add-room/add-room.component';
import { ReservationComponent } from './reservation/reservation.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { FooterComponent } from './footer/footer.component';
import { UserPageComponent } from './user-page/user-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
 

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    RoomsComponent,
    SearchRoomComponent,
    RoomsAdminComponent,
    AddRoomComponent,
    ReservationComponent,
    LoginComponent,
    FooterComponent,
    UserPageComponent,
    AdminPageComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule, 
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
