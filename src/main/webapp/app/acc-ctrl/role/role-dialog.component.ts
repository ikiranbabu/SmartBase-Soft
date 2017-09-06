import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Role } from './role.model';
import { RolePopupService } from './role-popup.service';
import { RoleService } from './role.service';
import { Permission, PermissionService } from '../permission';
import { SelectItem } from "primeng/primeng";

@Component({
    selector: 'jhi-role-dialog',
    templateUrl: './role-dialog.component.html'
})
export class RoleDialogComponent implements OnInit {

    role: Role;
    authorities: any[];
    isSaving: boolean;

    permissions: Permission[];
    permissionsOption: SelectItem[];
    permissionIds?: any[];

    constructor(public activeModal: NgbActiveModal,
                private alertService: JhiAlertService,
                private roleService: RoleService,
                private permissionService: PermissionService,
                private eventManager: JhiEventManager) {
    }

    ngOnInit() {
        let $this = this;
        this.permissionsOption = [];
        this.permissionIds = [];
        this.isSaving = false;

        this.permissionService.query().subscribe(
            (res: Response) => {
                this.permissions = res.json();
                this.permissions.forEach(function (permission) {
                    $this.permissionsOption.push({label: permission.name, value: permission.id});
                });
                if (this.role.id && this.role.permissions.length > 0){
                    this.role.permissions.forEach(function (rolePermission) {
                        $this.permissionIds.push(rolePermission.id);
                    });
                }
            }, (res: Response) => this.onError(res.json()));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        let $this = this;
        this.isSaving = true;
        if (!this.role.permissions){
            this.role.permissions = [];
        }
        this.permissionIds.forEach(function (permissionId) {
            $this.permissions.forEach(function (permission) {
                if (permission.id === permissionId ){
                    $this.role.permissions.push(permission);
                }
            });
        });
        if (this.role.id !== undefined) {
            this.roleService.update(this.role)
                .subscribe((res: Role) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.roleService.create(this.role)
                .subscribe((res: Role) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: Role) {
        this.eventManager.broadcast({name: 'roleListModification', content: 'OK'});
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

    trackPermissionById(index: number, item: Permission) {
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
    selector: 'jhi-role-popup',
    template: ''
})
export class RolePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(private route: ActivatedRoute,
                private rolePopupService: RolePopupService) {
    }

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.rolePopupService
                    .open(RoleDialogComponent as Component, params['id']);
            } else {
                this.rolePopupService
                    .open(RoleDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
