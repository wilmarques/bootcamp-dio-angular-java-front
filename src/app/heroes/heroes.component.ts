import { Component, OnInit } from '@angular/core';

import { Hero } from './hero';
import { HeroesService } from './heroes.service';

@Component({
  selector: 'app-heroes',
  template: `
    <ul *ngFor="let hero of heroes">
      <li>{{ hero.name }} - {{ hero.description }}</li>
    </ul>
  `,
  styles: [],
})
export class HeroesComponent implements OnInit {

  public heroes: Array<Hero> = [];

  constructor(
    private readonly service: HeroesService,
  ) {}

  public ngOnInit(): void {
    this.service.loadHeroes()
      .subscribe((heroes) => this.heroes = heroes);
  }
}
