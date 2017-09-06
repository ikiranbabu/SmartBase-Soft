import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PermissionGroup } from './permission-group.model';
import { PermissionGroupService } from './permission-group.service';
@Injectable()
export class PermissionGroupPopupService {
    // private isOpen = false;
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private permissionGroupService: PermissionGroupService

    ) {}

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;

            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.permissionGroupService.find(id).subscribe((permissionGroup) => {
                    this.permissionGroupModalRef(component, permissionGroup);
                });
            } else {
                // return this.codeModalRef(component, new Code());
                setTimeout(() => {
                    this.ngbModalRef = this.permissionGroupModalRef(component, new PermissionGroup());
                    resolve(this.ngbModalRef);
                }, 0);            }
        })
    }

    permissionGroupModalRef(component: Component, permissionGroup: PermissionGroup): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.permissionGroup = permissionGroup;
        modalRef.result.then((result) => {
            this.router.navigate(['/app/acc-ctrl/', { outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate(['/app/acc-ctrl/', { outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
