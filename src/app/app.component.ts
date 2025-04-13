import { Component, OnInit } from '@angular/core';
import { Router,RouterOutlet, RouterLink } from '@angular/router';
import { NavbarComponent } from './components/share/navbar/navbar.component';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-root',
    imports: [
      CommonModule,
      RouterOutlet,
      MatSidenavModule,
      MatToolbarModule,
      MatButtonModule,
      MatIconModule,
      RouterLink,
      NavbarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'allaskereso_portal';
  isLoggedIn=false;

  constructor(){}

  ngOnInit(): void {
    this.checkLoginStatus();
  }

  checkLoginStatus(): void{
    this.isLoggedIn =localStorage.getItem('isLoggedIn') ==='true';
  }

  logout(): void{
    localStorage.setItem('isLoggedIn', 'false');
    this.isLoggedIn = false;
    window.location.href = '/home';
  }

  onToggleSidenav(sidenav: MatSidenav){
    sidenav.toggle();
  }
}
