import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PermissionGroupComponent } from './permission-group.component';
import { PermissionGroupDetailComponent } from './permission-group-detail.component';
import { PermissionGroupPopupComponent } from './permission-group-dialog.component';
import { PermissionGroupDeletePopupComponent } from './permission-group-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class PermissionGroupResolvePagingParams implements Resolve<any> {

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

export const permissionGroupRoute: Routes = [
  {
    path: 'permission-group',
    component: PermissionGroupComponent,
    resolve: {
      'pagingParams': PermissionGroupResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'PermissionGroups'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'permission-group/:id',
    component: PermissionGroupDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'PermissionGroups'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const permissionGroupPopupRoute: Routes = [
  {
    path: 'permission-group-new',
    component: PermissionGroupPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'PermissionGroups'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'permission-group/:id/edit',
    component: PermissionGroupPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'PermissionGroups'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'permission-group/:id/delete',
    component: PermissionGroupDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'PermissionGroups'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
