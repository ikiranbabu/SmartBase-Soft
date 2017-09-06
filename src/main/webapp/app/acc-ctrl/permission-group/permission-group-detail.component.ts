import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager   } from 'ng-jhipster';

import { PermissionGroup } from './permission-group.model';
import { PermissionGroupService } from './permission-group.service';

@Component({
    selector: 'smartsoft-permission-group-detail',
    templateUrl: './permission-group-detail.component.html'
})
export class PermissionGroupDetailComponent implements OnInit, OnDestroy {

    permissionGroup: PermissionGroup;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private permissionGroupService: PermissionGroupService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPermissionGroups();
    }

    load(id) {
        this.permissionGroupService.find(id).subscribe((permissionGroup) => {
            this.permissionGroup = permissionGroup;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPermissionGroups() {
        this.eventSubscriber = this.eventManager.subscribe('permissionGroupListModification', (response) => this.load(this.permissionGroup.id));
    }
}
