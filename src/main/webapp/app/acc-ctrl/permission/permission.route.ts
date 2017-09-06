import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PermissionComponent } from './permission.component';
import { PermissionDetailComponent } from './permission-detail.component';
import { PermissionPopupComponent } from './permission-dialog.component';
import { PermissionDeletePopupComponent } from './permission-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class PermissionResolvePagingParams implements Resolve<any> {

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

export const permissionRoute: Routes = [
  {
    path: 'permission',
    component: PermissionComponent,
    resolve: {
      'pagingParams': PermissionResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Permissions'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'permission/:id',
    component: PermissionDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Permissions'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const permissionPopupRoute: Routes = [
  {
    path: 'permission-new',
    component: PermissionPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Permissions'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'permission/:id/edit',
    component: PermissionPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Permissions'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'permission/:id/delete',
    component: PermissionDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Permissions'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
