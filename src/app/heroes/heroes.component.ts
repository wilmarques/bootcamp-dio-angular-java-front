import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

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
export class HeroesComponent implements OnInit, OnDestroy {

  public heroes: Array<Hero> = [];
  
  private loadHerosSubscription!: Subscription;

  constructor(
    private readonly service: HeroesService,
  ) {}

  public ngOnInit(): void {
    this.loadHerosSubscription = this.service
      .loadHeroes()
      .subscribe((heroes) => (this.heroes = heroes));
  }

  public ngOnDestroy(): void {
    this.loadHerosSubscription.unsubscribe();
  }
}
