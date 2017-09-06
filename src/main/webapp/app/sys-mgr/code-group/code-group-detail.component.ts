import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager , JhiLanguageService  } from 'ng-jhipster';

import { CodeGroup } from './code-group.model';
import { CodeGroupService } from './code-group.service';

@Component({
    selector: 'smartsoft-code-group-detail',
    templateUrl: './code-group-detail.component.html'
})
export class CodeGroupDetailComponent implements OnInit, OnDestroy {

    codeGroup: CodeGroup;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private jhiLanguageService: JhiLanguageService,
        private codeGroupService: CodeGroupService,
        private route: ActivatedRoute
    ) {
        // this.jhiLanguageService.setLocations(['codeGroup']);
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInCodeGroups();
    }

    load(id) {
        this.codeGroupService.find(id).subscribe((codeGroup) => {
            this.codeGroup = codeGroup;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInCodeGroups() {
        this.eventSubscriber = this.eventManager.subscribe('codeGroupListModification', (response) => this.load(this.codeGroup.id));
    }
}
