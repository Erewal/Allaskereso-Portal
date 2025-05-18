import { ChangeDetectionStrategy, Component, signal, OnInit, computed } from '@angular/core';
import { Router } from '@angular/router';
import { NgStyle} from '@angular/common';
import { PipesPipe } from '../share/pipes/pipes.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { Munka } from '../share/models/Munka';
import { MunkaService } from '../share/services/munka.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
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

  constructor(private router: Router, private munkaService: MunkaService) {}

  ngOnInit(): void {
    this.munkaService.getMunkak().subscribe((data) => {
      console.log('Lekért adatok:', data);
      this.munka.set(data);
    });
  }

  Atvitel(selectedMunka: Munka): void {
    this.router.navigate(['/job-detail'], { state: { job: selectedMunka } });
  }
}
