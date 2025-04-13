import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { NgStyle } from '@angular/common';
import { PipesPipe } from '../share/pipes/pipes.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatButtonModule } from '@angular/material/button';
import { Munka } from '../share/models/Adat';

@Component({
  selector: 'app-home',
  imports: [
    MatCardModule,
    MatExpansionModule,
    MatButtonModule,
    PipesPipe,
    NgStyle
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent {
  readonly panelOpenState = signal(false);

  munka:Munka[] = [

    {
      id: 1,
      munkahelyszin: 'Szeged',
      munkaNeve: 'SzoftverFejlesztő',
      munkaLeiras: 'Fejleszd a legújabb szoftvereket.',
      munkafoto: 'szoftver.png',
      munkajelentkezesiHatarido: "Határidő: 2025.04.15",
      surgosmunkaeroKell: false
    },

    {
      id: 2,
      munkahelyszin: 'Budapest XI kerület',
      munkaNeve: 'Rendszermérnök',
      munkaLeiras: 'Feladatot lenne többek között a rendszereknek a fenntartása, hálozat karbantartása, hálozati infrastruktúra kialakítása',
      munkafoto: 'Rendszer.jpg',
      munkajelentkezesiHatarido: "Határidő: 2025.04.15",
      surgosmunkaeroKell: false
    },

    {
      id: 3,
      munkahelyszin: 'Budapest VII kerület',
      munkaNeve: 'Rendszergazda',
      munkaLeiras: 'Rendszerek adminisztrálása.',
      munkafoto: 'Rendszergazda.jpg',
      munkajelentkezesiHatarido: "Határidő: 2025.04.15",
      surgosmunkaeroKell: true
    },

    {
      id: 4,
      munkahelyszin: 'Budapest V kerület',
      munkaNeve: 'Etikus hacker',
      munkaLeiras: 'Etikus hackelés, a rendszerek biztonságának tesztelése.',
      munkafoto: 'Etikus.png',
      munkajelentkezesiHatarido: "Határidő: 2025.04.15",
      surgosmunkaeroKell: false
    },
  ]

  constructor (private router: Router) {}

  Atvitel(selectedMunka: Munka) : void{
    this.router.navigate(['/job-detail'], { state: { job: selectedMunka } });
  }
}
