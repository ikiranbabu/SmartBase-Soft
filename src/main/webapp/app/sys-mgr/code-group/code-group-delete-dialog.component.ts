import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiLanguageService } from 'ng-jhipster';

import { CodeGroup } from './code-group.model';
import { CodeGroupPopupService } from './code-group-popup.service';
import { CodeGroupService } from './code-group.service';

@Component({
    selector: 'smartsoft-code-group-delete-dialog',
    templateUrl: './code-group-delete-dialog.component.html'
})
export class CodeGroupDeleteDialogComponent {

    codeGroup: CodeGroup;

    constructor(
        private jhiLanguageService: JhiLanguageService,
        private codeGroupService: CodeGroupService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
        // this.jhiLanguageService.setLocations(['codeGroup']);
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.codeGroupService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'codeGroupListModification',
                content: 'Deleted an codeGroup'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'smartsoft-code-group-delete-popup',
    template: ''
})
export class CodeGroupDeletePopupComponent implements OnInit, OnDestroy {

    modalRef: NgbModalRef;
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private codeGroupPopupService: CodeGroupPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.codeGroupPopupService
                .open(CodeGroupDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
