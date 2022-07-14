import { Component } from '@angular/core';

import { HeroesService } from './heroes.service';

@Component({
  selector: 'app-heroes',
  template: `
    <ul *ngFor="let hero of heroes$ | async">
      <li>{{ hero.name }} - {{ hero.description }}</li>
    </ul>
  `,
  styles: [],
})
export class HeroesComponent {
  public heroes$ = this.service.loadHeroes();

  constructor(private readonly service: HeroesService) {}
}
