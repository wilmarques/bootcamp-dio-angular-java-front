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

  constructor(private readonly repository: HeroesRepositoryService) {}

  public loadHeroes(): Observable<Array<Hero>> {
    return this.repository
      .all()
      .pipe(tap((heroes) => this.heroes.next(heroes)));
  }

  public getHero(heroId: number): Observable<Hero> {
    return this.repository.one(heroId);
  }

  public createHero(newHero: Hero): Observable<Array<Hero>> {
    return this.repository.newHero(newHero).pipe(
      mergeMap(() => this.heroes),
      tap((currentHeroes) =>
        this.addNewHeroToCurrentList(newHero, currentHeroes),
      ),
    );
  }

  public modifyHero(
    modifiedHero: Hero,
    heroId: number,
  ): Observable<Array<Hero>> {
    return this.repository.replaceHero(modifiedHero, heroId).pipe(
      mergeMap(() => this.heroes),
      tap((currentHeroes) =>
        this.modifyHeroOnCurrentList(modifiedHero, currentHeroes),
      ),
    );
  }

  public deleteHero(heroToBeDeleted: Hero): Observable<void> {
    return this.repository.deleteHero(heroToBeDeleted.id).pipe(
      mergeMap(() => this.heroes),
      tap((currentHeroes) =>
        this.removeHeroFromCurrentList(heroToBeDeleted, currentHeroes),
      ),
      // mergeMap(() => of()), // Returns nothing
      ignoreElements(),
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
    const newHeroesList = currentHeroes.filter((hero) => hero.id !== removedHero.id);
    this.heroes.next(newHeroesList);
  }
}
