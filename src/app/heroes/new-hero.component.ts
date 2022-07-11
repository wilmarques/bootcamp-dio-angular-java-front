import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { take } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Hero } from './hero';
import { HeroesService } from './heroes.service';

@Component({
  selector: 'app-new-hero',
  template: `
    <h1>Novo herói</h1>
    <form [formGroup]="newHeroForm" (ngSubmit)="onSubmit()">
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

      <p>Preencha os campos para inserir.</p>
      
      <button type="submit" [disabled]="!newHeroForm.valid">Enviar</button>
    </form>
  `,
  styles: [],
})
export class NewHeroComponent {
  public newHeroForm = new FormGroup({
    name: new FormControl(''),
    description: new FormControl(''),
  });

  private get hero(): Hero {
    const name = this.newHeroForm.get('name')?.value!;
    const description = this.newHeroForm.get('description')?.value!;
    return {
      name,
      description,
    } as Hero;
  }

  constructor(
    private readonly service: HeroesService,
    private readonly location: Location,
  ) {}

  public onSubmit(): void {
    this.service
      .createHero(this.hero)
      .pipe(
        take(1),
        tap(() => this.location.back()),
      )
      .subscribe();
  }
}
