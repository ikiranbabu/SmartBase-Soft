import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoginComponent } from './login.component';
import { LoadingSpinnerComponent } from "../shared/loading-spinner/loading.spinner.component";
import { SmartsoftSharedModule } from "../shared/shared.module";

export const routes = [
  { path: '',
      component: LoginComponent,
      data: {
          authorities: [],
          pageTitle: 'global.title'
      },
      pathMatch: 'full' }
];

@NgModule({
  declarations: [
      LoginComponent
  ],
  imports: [
      SmartsoftSharedModule,
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes),
  ]
})
export class LoginModule {
  static routes = routes;
}
