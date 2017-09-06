import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Rx';
import { JhiEventManager   } from 'ng-jhipster';

import { Permission } from './permission.model';
import { PermissionService } from './permission.service';

@Component({
    selector: 'smartsoft-permission-detail',
    templateUrl: './permission-detail.component.html'
})
export class PermissionDetailComponent implements OnInit, OnDestroy {

    permission: Permission;
    private subscription: any;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private permissionService: PermissionService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInPermissions();
    }

    load(id) {
        this.permissionService.find(id).subscribe((permission) => {
            this.permission = permission;
        });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInPermissions() {
        this.eventSubscriber = this.eventManager.subscribe('permissionListModification', (response) => this.load(this.permission.id));
    }
}
