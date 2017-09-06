/*
 * Angular 2 decorators and services
 */
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { AppState } from './app.service';
import { ActivatedRouteSnapshot, NavigationEnd, Router, RoutesRecognized } from "@angular/router";
import { StateStorageService } from "./shared/auth/state-storage.service";
import { JhiLanguageHelper } from "./shared/language/language.helper";
import { JhiLanguageService } from "ng-jhipster";

/*
 * App Component
 * Top Level Component
 */
@Component({
    selector: 'app',
    encapsulation: ViewEncapsulation.None,
    styleUrls: [
        './scss/application.scss'
    ],
    template: `
        <router-outlet></router-outlet>
    `
})
export class SmartsoftAppComponent implements OnInit {

    constructor(private appState: AppState,
                private jhiLanguageHelper: JhiLanguageHelper,
                private jhiLanguageService: JhiLanguageService,
                private router: Router,
                private $storageService: StateStorageService) {
        // Just for forcing translation loading
        // jhiLanguageService.setLocations(['all']);
        // jhiLanguageService.addLocation('all');
    }

    private getPageTitle(routeSnapshot: ActivatedRouteSnapshot) {
        let title: string = (routeSnapshot.data && routeSnapshot.data['pageTitle']) ? routeSnapshot.data['pageTitle'] : 'smartsoftApp';
        if (routeSnapshot.firstChild) {
            title = this.getPageTitle(routeSnapshot.firstChild) || title;
        }
        return title;
    }

    ngOnInit() {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                this.jhiLanguageHelper.updateTitle(this.getPageTitle(this.router.routerState.snapshot.root));
            }
        });
    }

}
