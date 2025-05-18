import { ChangeDetectionStrategy, Component, signal, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgStyle } from '@angular/common';
import { PipesPipe } from '../share/pipes/pipes.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { Munka } from '../share/models/Munka';
import { MunkaService } from '../share/services/munka.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    FormsModule,
    PipesPipe,
    NgStyle
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit {
  readonly panelOpenState = signal(false);
  readonly munka = signal<Munka[]>([]);
  filterType = 'osszes';

  constructor(private router: Router, private munkaService: MunkaService) {}

  ngOnInit(): void {
    this.frissitMunkaLista();
  }

  frissitMunkaLista(): void {
    if (this.filterType === 'surgos') {
      this.munkaService.getSurgosMunkak().subscribe(data => this.munka.set(data));
    } else if (this.filterType === 'budapest') {
      this.munkaService.getBudapestiMunkak().subscribe(data => this.munka.set(data));
    } else {
      this.munkaService.getMunkak().subscribe(data => this.munka.set(data));
    }
  }

  szuresValtozott(): void {
    this.frissitMunkaLista();
  }

  Atvitel(selectedMunka: Munka): void {
    this.router.navigate(['/job-detail'], { state: { job: selectedMunka } });
  }
}
