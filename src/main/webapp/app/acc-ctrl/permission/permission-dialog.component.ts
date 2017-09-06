import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Permission } from './permission.model';
import { PermissionPopupService } from './permission-popup.service';
import { PermissionService } from './permission.service';
import { Resource, ResourceService } from '../resource';
import { Role, RoleService } from '../role';
import { PermissionGroup, PermissionGroupService } from '../permission-group';
import { SelectItem } from "primeng/primeng";

@Component({
    selector: 'smartsoft-permission-dialog',
    templateUrl: './permission-dialog.component.html'
})
export class PermissionDialogComponent implements OnInit {

    permission: Permission;
    authorities: any[];
    isSaving: boolean;

    resources: Resource[];
    roles: Role[];

    permissiongroups: PermissionGroup[];

    resourceOptions: SelectItem[];
    resourceIds: any[];
    temp: any[];

    constructor(
        public activeModal: NgbActiveModal,
        private alertService: JhiAlertService,
        private permissionService: PermissionService,
        private resourceService: ResourceService,
        private roleService: RoleService,
        private permissionGroupService: PermissionGroupService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.resourceOptions = [];
        this.resourceIds = [];

        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.resourceService.query().subscribe(
            (res: Response) => {
                this.resources = res.json();
                this.resources.forEach((resource) => {
                    this.resourceOptions.push({label: resource.name, value: resource.name});
                });
                if (this.permission.id && this.permission.resources.length > 0){
                    this.permission.resources.forEach(resource => {
                        this.resourceIds.push(resource.name);
                    });
                }

                }, (res: Response) => this.onError(res.json()));
        this.roleService.query().subscribe(
            (res: Response) => { this.roles = res.json(); }, (res: Response) => this.onError(res.json()));
        this.permissionGroupService.query().subscribe(
            (res: Response) => { this.permissiongroups = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
         this.temp = [];

        if (!this.permission.resources){
            this.permission.resources = [];
        }
        if (this.resourceIds.length === 0){
            this.permission.resources = [];
        }else {
            this.resourceIds.forEach((resId) => {
                this.resources.forEach((res) => {
                    if (res.name === resId) {
                        this.temp.push(res);
                    }
                    this.permission.resources = this.temp;
                });
            });
        }
        if (this.permission.id !== undefined) {
            this.permissionService.update(this.permission)
                .subscribe((res: Permission) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.permissionService.create(this.permission)
                .subscribe((res: Permission) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: Permission) {
        this.eventManager.broadcast({ name: 'permissionListModification', content: 'OK'});
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

    trackResourceById(index: number, item: Resource) {
        return item.id;
    }

    trackRoleById(index: number, item: Role) {
        return item.id;
    }

    trackPermissionGroupById(index: number, item: PermissionGroup) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'smartsoft-permission-popup',
    template: ''
})
export class PermissionPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private permissionPopupService: PermissionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.permissionPopupService
                    .open(PermissionDialogComponent as Component, params['id']);
            } else {
                this.permissionPopupService
                    .open(PermissionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
