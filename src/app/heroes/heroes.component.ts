import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

import { Hero } from './hero';
import { HeroesService } from './heroes.service';

@Component({
  selector: 'app-heroes',
  template: `
    <h1>Heróis</h1>
    <a routerLink="hero">Novo herói</a>

    <table role="grid">
      <tbody>
        <tr *ngFor="let hero of heroes$ | async">
          <th scope="row">{{ hero.name }}</th>
          <td>{{ hero.description }}</td>
          <td><a [routerLink]="['hero', hero.id]">Editar</a></td>
          <td><a (click)="deleteHero(hero)">Excluir</a></td>
        </tr>
      </tbody>
    </table>
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
