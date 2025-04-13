import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {MatListModule} from '@angular/material/list';
import { MatSidenav } from '@angular/material/sidenav';
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
  constructor(){
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
    localStorage.setItem('isLoggedIn', 'false');
    window.location.href ='/home';
    this.closeMenu();
  }
}
