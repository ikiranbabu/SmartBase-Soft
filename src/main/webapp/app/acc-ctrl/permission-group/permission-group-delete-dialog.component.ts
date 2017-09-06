import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PermissionGroup } from './permission-group.model';
import { PermissionGroupPopupService } from './permission-group-popup.service';
import { PermissionGroupService } from './permission-group.service';

@Component({
    selector: 'smartsoft-permission-group-delete-dialog',
    templateUrl: './permission-group-delete-dialog.component.html'
})
export class PermissionGroupDeleteDialogComponent {

    permissionGroup: PermissionGroup;

    constructor(
        private permissionGroupService: PermissionGroupService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.permissionGroupService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'permissionGroupListModification',
                content: 'Deleted an permissionGroup'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'smartsoft-permission-group-delete-popup',
    template: ''
})
export class PermissionGroupDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private permissionGroupPopupService: PermissionGroupPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.permissionGroupPopupService
                .open(PermissionGroupDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
