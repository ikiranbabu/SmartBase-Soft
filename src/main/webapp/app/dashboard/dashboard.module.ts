import { CUSTOM_ELEMENTS_SCHEMA, NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { RouterModule } from '@angular/router';
import { WidgetDirective } from '../layout/widget/widget.directive';
import { DashboardComponent } from "./dashboard.component";

export const routes = [
  { path: '', component: DashboardComponent, pathMatch: 'full' }
];


@NgModule({
  imports: [ CommonModule, RouterModule.forChild(routes) ],
  declarations: [ DashboardComponent, WidgetDirective ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardModule {
  static routes = routes;
}
