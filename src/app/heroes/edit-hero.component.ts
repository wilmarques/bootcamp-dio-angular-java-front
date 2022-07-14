import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { tap, map, mergeMap } from 'rxjs/operators';

import { Hero } from './hero';
import { HeroesService } from './heroes.service';

@Component({
  selector: 'app-new-hero',
  template: `
    <h1>Editar herói</h1>
    <form [formGroup]="heroForm" (ngSubmit)="onSubmit()">
      <input type="hidden" id="id" name="id" formControlName="id" />

      <label for="name">Nome: </label>
      <input
        id="name"
        type="text"
        placeholder="Nome"
        aria-label="Nome"
        formControlName="name"
        required
      />

      <label for="description">Descrição: </label>
      <textarea
        id="description"
        placeholder="Descrição"
        aria-label="Descrição"
        formControlName="description"
        required
      >
      </textarea>

      <button type="submit" [disabled]="!heroForm.valid">Enviar</button>
    </form>
  `,
  styles: [],
})
export class EditHeroComponent implements OnInit {
  public heroForm = new FormGroup({
    id: new FormControl(''),
    name: new FormControl(''),
    description: new FormControl(''),
  });

  private get hero(): Hero {
    const id = this.heroForm.get('id')?.value!;
    const name = this.heroForm.get('name')?.value!;
    const description = this.heroForm.get('description')?.value!;
    return {
      id: parseInt(id, 10),
      name,
      description,
    };
  }
  private set hero(hero: Hero) {
    this.heroForm.get('id')?.setValue(hero.id + '');
    this.heroForm.get('name')?.setValue(hero.name);
    this.heroForm.get('description')?.setValue(hero.description);
  }

  constructor(
    private readonly service: HeroesService,
    private readonly location: Location,
    private readonly route: ActivatedRoute,
  ) {}

  public ngOnInit(): void {
    this.route.paramMap
      .pipe(
        take(1),
        map((params) => parseInt(params.get('id')!, 10)),
        mergeMap((heroId) => this.service.getHero(heroId)),
        tap((hero) => (this.hero = hero)),
      )
      .subscribe();
  }

  public onSubmit(): void {
    this.service
      .modifyHero(this.hero, this.hero.id)
      .pipe(
        take(1),
        tap(() => this.location.back()),
      )
      .subscribe();
  }
}
