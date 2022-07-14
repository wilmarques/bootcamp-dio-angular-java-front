import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HeroesComponent } from './heroes.component';
import { NewHeroComponent } from './new-hero.component';

const routes: Routes = [
  { path: '', component: HeroesComponent },
  {
    path: 'hero',
    component: NewHeroComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroesRoutingModule {}
