import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuOpen: boolean = false;

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    const menu = document.getElementById("menulist");
    if (menu) {
      menu.style.maxHeight = this.menuOpen ? "100vh" : "0px";
    }
  }

}
