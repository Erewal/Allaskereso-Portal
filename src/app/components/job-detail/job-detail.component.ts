import { Component, OnInit } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { Munka } from '../share/models/Adat';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { PipesPipe } from '../share/pipes/pipes.pipe';
@Component({
  selector: 'app-job-detail',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    PipesPipe,
    RouterLink
  ],
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {
  munka?: Munka;

  constructor(private router: Router, private matSnackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.munka = history.state.job;
    if (!this.munka) {
      this.router.navigate(['/home']);
    }
  }

  onApplyJob(): void {
    console.log('Jelentkezés a munkára:', this.munka);
  }

  openSnackBar(): void {
    this.matSnackBar.open('Jelentkezésedet rögzítettük!', 'Bezár', {
      duration: 3000  
    });
  }
}
