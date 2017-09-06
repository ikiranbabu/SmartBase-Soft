import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiLanguageService } from 'ng-jhipster';

import { Code } from './code.model';
import { CodePopupService } from './code-popup.service';
import { CodeService } from './code.service';
import { CodeGroup, CodeGroupService } from '../code-group';

@Component({
    selector: 'smartsoft-code-dialog',
    templateUrl: './code-dialog.component.html'
})
export class CodeDialogComponent implements OnInit {

    code: Code;
    authorities: any[];
    isSaving: boolean;

    codegroups: CodeGroup[];
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: JhiAlertService,
        private codeService: CodeService,
        private codeGroupService: CodeGroupService,
        private eventManager: JhiEventManager
    ) {
        // this.jhiLanguageService.setLocations(['code']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.codeGroupService.query().subscribe(
            (res: Response) => { this.codegroups = res.json(); }, (res: Response) => this.onError(res.json()));
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.code.id !== undefined) {
            this.codeService.update(this.code)
                .subscribe((res: Code) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.codeService.create(this.code)
                .subscribe((res: Code) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: Code) {
        this.eventManager.broadcast({ name: 'codeListModification', content: 'OK'});
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
        // this.alertService.error(error.message, null, null);
    }

    trackCodeGroupById(index: number, item: CodeGroup) {
        return item.id;
    }
}

@Component({
    selector: 'smartsoft-code-popup',
    template: ''
})
export class CodePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private codePopupService: CodePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.codePopupService
                    .open(CodeDialogComponent as Component, params['id']);
            } else {
                this.codePopupService
                    .open(CodeDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
