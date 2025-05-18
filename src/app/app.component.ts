import { Component, OnInit } from '@angular/core';
import { Router,RouterOutlet, RouterLink } from '@angular/router';
import { NavbarComponent } from './components/share/navbar/navbar.component';
import {MatSidenav, MatSidenavModule} from '@angular/material/sidenav';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CommonModule } from '@angular/common';
import { AuthService } from './components/share/services/auth.service';
import { Subscription } from 'rxjs';
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
  title = 'allaskereso-portal';
  isLoggedIn=false;
  private autSubscription?: Subscription;
  constructor(private authService: AuthService){}

  ngOnInit(): void {
    this.autSubscription = this.authService.currentUser.subscribe(user => {
    this.isLoggedIn = !!user;
    localStorage.setItem('isLoggedIn',this.isLoggedIn ? 'true': 'false');
    });
  }

  ngOnDestroy(): void{
    this.autSubscription?.unsubscribe();
  }

  logout(): void{
    this.authService.signOut();
  }

  onToggleSidenav(sidenav: MatSidenav){
    sidenav.toggle();
  }
}
