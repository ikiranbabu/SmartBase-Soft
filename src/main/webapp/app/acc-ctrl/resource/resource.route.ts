import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { ResourceComponent } from './resource.component';
import { ResourceDetailComponent } from './resource-detail.component';
import { ResourcePopupComponent } from './resource-dialog.component';
import { ResourceDeletePopupComponent } from './resource-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class ResourceResolvePagingParams implements Resolve<any> {

  constructor(private paginationUtil: JhiPaginationUtil) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
      let page = route.queryParams['page'] ? route.queryParams['page'] : '1';
      let sort = route.queryParams['sort'] ? route.queryParams['sort'] : 'id,asc';
      return {
          page: this.paginationUtil.parsePage(page),
          predicate: this.paginationUtil.parsePredicate(sort),
          ascending: this.paginationUtil.parseAscending(sort)
    };
  }
}

export const resourceRoute: Routes = [
  {
    path: 'resource',
    component: ResourceComponent,
    resolve: {
      'pagingParams': ResourceResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Resources'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'resource/:id',
    component: ResourceDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Resources'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const resourcePopupRoute: Routes = [
  {
    path: 'resource-new',
    component: ResourcePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Resources'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'resource/:id/edit',
    component: ResourcePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Resources'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'resource/:id/delete',
    component: ResourceDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Resources'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
