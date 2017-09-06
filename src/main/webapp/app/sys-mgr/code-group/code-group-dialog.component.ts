import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService, JhiLanguageService } from 'ng-jhipster';

import { CodeGroup } from './code-group.model';
import { CodeGroupPopupService } from './code-group-popup.service';
import { CodeGroupService } from './code-group.service';

@Component({
    selector: 'smartsoft-code-group-dialog',
    templateUrl: './code-group-dialog.component.html'
})
export class CodeGroupDialogComponent implements OnInit {

    codeGroup: CodeGroup;
    authorities: any[];
    isSaving: boolean;
    validateUrl: string;
    constructor(
        public activeModal: NgbActiveModal,
        private jhiLanguageService: JhiLanguageService,
        private alertService: JhiAlertService,
        private codeGroupService: CodeGroupService,
        private eventManager: JhiEventManager
    ) {
        // this.jhiLanguageService.setLocations(['codeGroup']);
    }

    ngOnInit() {
        this.isSaving = false;
        this.authorities = ['ROLE_USER', 'ROLE_ADMIN'];
        this.validateUrl = this.codeGroupService.validateUrl;
    }
    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.codeGroup.id !== undefined) {
            this.codeGroupService.update(this.codeGroup)
                .subscribe((res: CodeGroup) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        } else {
            this.codeGroupService.create(this.codeGroup)
                .subscribe((res: CodeGroup) =>
                    this.onSaveSuccess(res), (res: Response) => this.onSaveError(res));
        }
    }

    private onSaveSuccess(result: CodeGroup) {
        this.eventManager.broadcast({ name: 'codeGroupListModification', content: 'OK'});
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
    selector: 'smartsoft-code-group-popup',
    template: ''
})
export class CodeGroupPopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private codeGroupPopupService: CodeGroupPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.codeGroupPopupService
                    .open(CodeGroupDialogComponent as Component, params['id']);
            } else {
               this.codeGroupPopupService
                    .open(CodeGroupDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
