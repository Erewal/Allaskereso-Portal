import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import { MatSidenav } from '@angular/material/sidenav';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-navbar',
  imports: [
    RouterLink,
    RouterLinkActive, 
    MatListModule
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit, AfterViewInit {
  @Input() sidenav!: MatSidenav;
  @Input() isLoggedIn: boolean = false;
  @Output() logoutEvent = new EventEmitter<void>();
  constructor(private authService: AuthService){
  console.log("constructor called");
  }  

  ngOnInit(): void {
    console.log("a");
  }
  ngAfterViewInit(): void {
    console.log("a");
  }
  closeMenu(){
    if(this.sidenav){
      this.sidenav.close();
    }
  }
  logout(){
  this.authService.signOut().then(() => {
    this.logoutEvent.emit(),
    this.closeMenu();
    });
  }
}
