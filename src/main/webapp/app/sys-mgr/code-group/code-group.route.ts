import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CodeGroupComponent } from './code-group.component';
import { CodeGroupDetailComponent } from './code-group-detail.component';
import { CodeGroupPopupComponent } from './code-group-dialog.component';
import { CodeGroupDeletePopupComponent } from './code-group-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class CodeGroupResolvePagingParams implements Resolve<any> {

  constructor(private paginationUtil: JhiPaginationUtil) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      const page = route.queryParams['page'] ? route.queryParams['page'] : '1';
      const sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
      return {
          page: this.paginationUtil.parsePage(page),
          predicate: this.paginationUtil.parsePredicate(sort),
          ascending: this.paginationUtil.parseAscending(sort)
    };
  }
}

export const codeGroupRoute: Routes = [
  {
    path: 'code-group',
    component: CodeGroupComponent,
    resolve: {
      'pagingParams': CodeGroupResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'smartsoftApp.codeGroup.home.title'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'code-group/:id',
    component: CodeGroupDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'smartsoftApp.codeGroup.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const codeGroupPopupRoute: Routes = [
  {
    path: 'code-group-new',
    component: CodeGroupPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'smartsoftApp.codeGroup.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'code-group/:id/edit',
    component: CodeGroupPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'smartsoftApp.codeGroup.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'code-group/:id/delete',
    component: CodeGroupDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'smartsoftApp.codeGroup.home.title'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
