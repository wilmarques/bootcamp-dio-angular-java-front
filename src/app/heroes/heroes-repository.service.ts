import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Hero } from './hero';
import { environment } from '../../environments/environment';

type HeroesApiGetResponse = {
  _embedded: {
    heroList: Array<Hero>;
  };
};

@Injectable({
  providedIn: 'root',
})
export class HeroesRepositoryService {
  private readonly heroesApiEndpoint = environment.heroesApiUrl;

  constructor(private readonly httpClient: HttpClient) { }

  public all(): Observable<Array<Hero>> {
    return this.httpClient.get<HeroesApiGetResponse>(this.heroesApiEndpoint).pipe(
      map((response) => response._embedded.heroList),
    );
  }

  public newHero(newHero: Hero): Observable<Hero> {
    return this.httpClient.post<Hero>(this.heroesApiEndpoint, newHero);
  }

  public one(heroId: number): Observable<Hero> {
    return this.httpClient.get<Hero>(this.heroesApiEndpoint, {
      params: {
        id: heroId,
      },
    });
  }

  public replaceHero(newHero: Hero, currentHeroId: number): Observable<Hero> {
    return this.httpClient.put<Hero>(this.heroesApiEndpoint, newHero, {
      params: {
        id: currentHeroId,
      },
    });
  }

  public deleteHero(heroId: number): Observable<void> {
    return this.httpClient.delete<void>(this.heroesApiEndpoint, {
      params: {
        id: heroId,
      },
    });
  }
}
