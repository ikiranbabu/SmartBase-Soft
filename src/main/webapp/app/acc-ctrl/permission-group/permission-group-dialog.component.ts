import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PermissionGroup } from './permission-group.model';
import { PermissionGroupPopupService } from './permission-group-popup.service';
import { PermissionGroupService } from './permission-group.service';

@Component({
    selector: 'smartsoft-permission-group-dialog',
    templateUrl: './permission-group-dialog.component.html'
})
export class PermissionGroupDialogComponent implements OnInit {

    permissionGroup: PermissionGroup;
    authorities: any[];
    isSaving: boolean;
    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private permissionGroupService: PermissionGroupService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.permissionGroup.id !== undefined) {
            this.permissionGroupService.update(this.permissionGroup)
                .subscribe((res: PermissionGroup) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.permissionGroupService.create(this.permissionGroup)
                .subscribe((res: PermissionGroup) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: PermissionGroup) {
        this.eventManager.broadcast({ name: 'permissionGroupListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError(error) {
        try {
            error.json();
        } catch (exception) {
            error.message = error.text();
        }
        this.isSaving = false;
        this.onError(error);
    }

    private onError(error) {
        this.alertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'smartsoft-permission-group-popup',
    template: ''
})
export class PermissionGroupPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private permissionGroupPopupService: PermissionGroupPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.permissionGroupPopupService
                    .open(PermissionGroupDialogComponent as Component, params['id']);
            } else {
                this.permissionGroupPopupService
                    .open(PermissionGroupDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
