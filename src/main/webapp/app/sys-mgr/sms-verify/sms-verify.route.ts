import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { SmsVerifyComponent } from './sms-verify.component';
import { SmsVerifyDetailComponent } from './sms-verify-detail.component';
import { SmsVerifyPopupComponent } from './sms-verify-dialog.component';
import { SmsVerifyDeletePopupComponent } from './sms-verify-delete-dialog.component';

import { Principal } from '../../shared';

@Injectable()
export class SmsVerifyResolvePagingParams implements Resolve<any> {

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

export const smsVerifyRoute: Routes = [
  {
    path: 'sms-verify',
    component: SmsVerifyComponent,
    resolve: {
      'pagingParams': SmsVerifyResolvePagingParams
    },
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'SmsVerifies'
    },
    canActivate: [UserRouteAccessService]
  }, {
    path: 'sms-verify/:id',
    component: SmsVerifyDetailComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'SmsVerifies'
    },
    canActivate: [UserRouteAccessService]
  }
];

export const smsVerifyPopupRoute: Routes = [
  {
    path: 'sms-verify-new',
    component: SmsVerifyPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'SmsVerifies'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'sms-verify/:id/edit',
    component: SmsVerifyPopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'SmsVerifies'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  },
  {
    path: 'sms-verify/:id/delete',
    component: SmsVerifyDeletePopupComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'SmsVerifies'
    },
    canActivate: [UserRouteAccessService],
    outlet: 'popup'
  }
];
