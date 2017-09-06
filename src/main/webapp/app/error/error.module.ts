import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { SmartsoftErrorComponent } from './error.component';

export const routes = [
  { path: '', component: SmartsoftErrorComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [
      SmartsoftErrorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ]
})
export class ErrorModule {
  static routes = routes;
}
