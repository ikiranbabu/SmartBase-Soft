import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Role } from './role.model';
import { RoleService } from './role.service';
@Injectable()
export class RolePopupService {
    // private isOpen = false;
    private ngbModalRef: NgbModalRef;

    constructor (
        private modalService: NgbModal,
        private router: Router,
        private roleService: RoleService

    ) {}

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;

            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.roleService.find(id).subscribe(role => {
                    this.roleModalRef(component, role);
                });
            } else {
                // return this.roleModalRef(component, new Role());
                setTimeout(() => {
                    this.ngbModalRef = this.roleModalRef(component, new Role());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        })
    }

    roleModalRef(component: Component, role: Role): NgbModalRef {
        let modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.role = role;
        modalRef.result.then(result => {
            this.router.navigate(['/app/acc-ctrl', { outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate(['/app/acc-ctrl', { outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
