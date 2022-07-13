import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HeroesRepositoryService {
  private readonly heroesApiEndpoint = environment.heroesApiUrl;

  constructor(private readonly httpClient: HttpClient) {}

  public all(): Observable<Array<Hero>> {
    return this.httpClient.get<Array<Hero>>(this.heroesApiEndpoint);
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
