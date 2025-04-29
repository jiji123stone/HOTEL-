import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuOpen: boolean = false;
  isAdmin = false;



  constructor(private router: Router , private authService: AuthService) {}

  ngOnInit() {
    this.isAdmin = this.authService.isAdmin();
  }

  isModalOpen: boolean = false;

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    const menu = document.getElementById("menulist");
    if (menu) {
      menu.style.maxHeight = this.menuOpen ? "100vh" : "0px";
    }
  }

}
