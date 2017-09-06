import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Code } from './code.model';
import { CodeService } from './code.service';
@Injectable()
export class CodePopupService {
    // private isOpen = false;
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private codeService: CodeService

    ) {}

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;

            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.codeService.find(id).subscribe((code) => {
                    code.createDate = this.datePipe
                        .transform(code.createDate, 'yyyy-MM-ddThh:mm');
                    code.updateDate = this.datePipe
                        .transform(code.updateDate, 'yyyy-MM-ddThh:mm');
                    this.codeModalRef(component, code);
                });
            } else {
                // return this.codeModalRef(component, new Code());
                setTimeout(() => {
                    this.ngbModalRef = this.codeModalRef(component, new Code());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        })
    }

    codeModalRef(component: Component, code: Code): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.code = code;
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
