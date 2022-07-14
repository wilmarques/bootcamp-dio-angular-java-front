import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { HeroesRoutingModule } from './heroes-routing.module';
import { HeroesComponent } from './heroes.component';
import { NewHeroComponent } from './new-hero.component';
import { EditHeroComponent } from './edit-hero.component';

@NgModule({
  declarations: [HeroesComponent, NewHeroComponent, EditHeroComponent],
  imports: [CommonModule, ReactiveFormsModule, HeroesRoutingModule],
})
export class HeroesModule {}
