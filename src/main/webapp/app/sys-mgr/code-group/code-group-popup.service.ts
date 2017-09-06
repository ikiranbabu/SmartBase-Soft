import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { CodeGroup } from './code-group.model';
import { CodeGroupService } from './code-group.service';
@Injectable()
export class CodeGroupPopupService {
    // private isOpen = false;
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private codeGroupService: CodeGroupService

    ) {}

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;

            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.codeGroupService.find(id).subscribe((codeGroup) => {
                    codeGroup.createDate = this.datePipe
                        .transform(codeGroup.createDate, 'yyyy-MM-ddThh:mm');
                    codeGroup.updateDate = this.datePipe
                        .transform(codeGroup.updateDate, 'yyyy-MM-ddThh:mm');
                    this.codeGroupModalRef(component, codeGroup);
                });
            } else {
                // return this.codeModalRef(component, new Code());
                setTimeout(() => {
                    this.ngbModalRef = this.codeGroupModalRef(component, new CodeGroup());
                    resolve(this.ngbModalRef);
                }, 0);            }
        })
    }

    codeGroupModalRef(component: Component, codeGroup: CodeGroup): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.codeGroup = codeGroup;
        modalRef.result.then((result) => {
            this.router.navigate(['/app/sys-mgr/', { outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate(['/app/sys-mgr/', { outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
