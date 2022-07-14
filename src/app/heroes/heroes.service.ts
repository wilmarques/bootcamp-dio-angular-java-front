import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY, noop, Observable, of } from 'rxjs';
import { tap, mergeMap, map, ignoreElements } from 'rxjs/operators';

import { Hero } from './hero';
import { HeroesRepositoryService } from './heroes-repository.service';

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  public heroes = new BehaviorSubject<Array<Hero>>([]);

  private loaded = false;

  constructor(private readonly repository: HeroesRepositoryService) {}

  public loadHeroes(): Observable<Array<Hero>> {
    if (this.loaded === true) {
      return this.heroes;
    }

    return this.repository.all().pipe(
      tap((heroes) => this.heroes.next(heroes)),
      tap(() => (this.loaded = true)),
    );
  }

  public getHero(heroId: number): Observable<Hero> {
    return this.repository.one(heroId);
  }

  public createHero(newHero: Hero): Observable<Hero> {
    return this.repository
      .newHero(newHero)
      .pipe(
        tap((createdHero) =>
          this.addNewHeroToCurrentList(createdHero, this.heroes.value),
        ),
      );
  }

  public modifyHero(newHero: Hero, currentHeroId: number): Observable<Hero> {
    return this.repository
      .replaceHero(newHero, currentHeroId)
      .pipe(
        tap((modifiedHero) =>
          this.modifyHeroOnCurrentList(modifiedHero, this.heroes.value),
        ),
      );
  }

  public deleteHero(heroToBeDeleted: Hero): Observable<void> {
    return this.repository
      .deleteHero(heroToBeDeleted.id)
      .pipe(
        tap(() =>
          this.removeHeroFromCurrentList(heroToBeDeleted, this.heroes.value),
        ),
      );
  }

  private addNewHeroToCurrentList(
    newHero: Hero,
    currentHeroes: Array<Hero>,
  ): void {
    this.heroes.next([...currentHeroes, newHero]);
  }

  private modifyHeroOnCurrentList(
    modifiedHero: Hero,
    currentHeroes: Array<Hero>,
  ): void {
    debugger;
    const currentHeroIndex = currentHeroes.findIndex(
      (hero) => hero.id === modifiedHero.id,
    );
    currentHeroes.splice(currentHeroIndex, 1, modifiedHero);
    this.heroes.next(currentHeroes);
  }

  private removeHeroFromCurrentList(
    removedHero: Hero,
    currentHeroes: Array<Hero>,
  ): void {
    const newHeroesList = currentHeroes.filter(
      (hero) => hero.id !== removedHero.id,
    );
    this.heroes.next(newHeroesList);
  }
}
