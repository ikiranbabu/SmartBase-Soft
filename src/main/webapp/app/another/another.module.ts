import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { RouterModule } from '@angular/router';
import { AnotherPageComponent } from './another.component';

export const routes = [
  { path: '', component: AnotherPageComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [ CommonModule, RouterModule.forChild(routes) ],
  declarations: [ AnotherPageComponent ]
})
export class AnotherModule {
  static routes = routes;
}
