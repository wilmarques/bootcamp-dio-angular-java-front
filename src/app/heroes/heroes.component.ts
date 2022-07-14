import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { Hero } from './hero';
import { HeroesService } from './heroes.service';

@Component({
  selector: 'app-heroes',
  template: `
    <h1>Heróis</h1>
    <a routerLink="hero">Novo herói</a>
    <ul *ngFor="let hero of heroes$ | async">
      <li>
        {{ hero.name }}
        -
        {{ hero.description }}
        -
        <a [routerLink]="['hero', hero.id]">Editar</a>
        -
        <button type="button" (click)="deleteHero(hero)">Excluir</button>
      </li>
    </ul>
  `,
  styles: [],
})
export class HeroesComponent implements OnInit {
  public heroes$ = this.service.heroes;

  constructor(private readonly service: HeroesService) {}

  public ngOnInit(): void {
    this.service.loadHeroes().pipe(take(1)).subscribe();
  }

  public deleteHero(hero: Hero): void {
    this.service.deleteHero(hero).pipe(take(1)).subscribe();
  }
}
