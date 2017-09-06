import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Permission } from './permission.model';
import { PermissionService } from './permission.service';
@Injectable()
export class PermissionPopupService {
    // private isOpen = false;
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private permissionService: PermissionService

    ) {}

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;

            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.permissionService.find(id).subscribe((permission) => {
                    this.permissionModalRef(component, permission);
                });
            } else {
                // return this.permissionModalRef(component, new Permission());

                setTimeout(() => {
                    this.ngbModalRef = this.permissionModalRef(component, new Permission());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        })
    }

    permissionModalRef(component: Component, permission: Permission): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.permission = permission;
        modalRef.result.then((result) => {
            this.router.navigate(['/app/acc-ctrl', { outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate(['/app/acc-ctrl', { outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
