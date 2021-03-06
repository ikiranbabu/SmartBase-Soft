import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiLanguageService } from 'ng-jhipster';

import { Code } from './code.model';
import { CodePopupService } from './code-popup.service';
import { CodeService } from './code.service';

@Component({
    selector: 'smartsoft-code-delete-dialog',
    templateUrl: './code-delete-dialog.component.html'
})
export class CodeDeleteDialogComponent {

    code: Code;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private codeService: CodeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
        // this.jhiLanguageService.setLocations(['code']);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.codeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'codeListModification',
                content: 'Deleted an code'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'smartsoft-code-delete-popup',
    template: ''
})
export class CodeDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private codePopupService: CodePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.codePopupService
                .open(CodeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
