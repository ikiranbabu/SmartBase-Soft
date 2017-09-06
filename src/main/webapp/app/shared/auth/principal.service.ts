import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AccountService } from './account.service';
import { SessionStorageService } from "ng2-webstorage";

@Injectable()
export class Principal {
    private userIdentity: any;
    private authenticated = false;
    private authenticationState = new Subject<any>();

    constructor(
        private account: AccountService,
        private $sessionStorage: SessionStorageService
    ) {

    }

    authenticate(identity) {
        this.userIdentity = identity;
        this.authenticated = identity !== null;
        this.$sessionStorage.clear('principal-userIdentity');
        this.$sessionStorage.clear('principal-authenticated');
        this.authenticationState.next(this.userIdentity);
    }

    hasAnyPermission(permissions: string[]): Promise<boolean> {
        return Promise.resolve(this.hasAnyPermissionDirect(permissions));
    }

    hasAnyPermissionDirect(permissions: string[]): boolean {
        if (!this.userIdentity) {
            this.userIdentity = JSON.parse(this.$sessionStorage.retrieve('principal-userIdentity'));
        }
        if (!this.authenticated) {
            this.authenticated = this.$sessionStorage.retrieve('principal-authenticated');
        }
        if (!this.authenticated || !this.userIdentity || !this.userIdentity.permissions) {
            return false;
        }

        for (let i = 0; i < permissions.length; i++) {
            if (this.userIdentity.permissions.indexOf(permissions[i]) !== -1) {
                return true;
            }
        }

        return false;
    }

    hasAnyAuthority(authorities: string[]): Promise<boolean> {
        return Promise.resolve(this.hasAnyAuthorityDirect(authorities));
    }

    hasAnyAuthorityDirect(authorities: string[]): boolean {
        if (!this.userIdentity) {
            this.userIdentity = JSON.parse(this.$sessionStorage.retrieve('principal-userIdentity'));
        }
        if (!this.authenticated) {
            this.authenticated = this.$sessionStorage.retrieve('principal-authenticated');
        }
        if (!this.authenticated || !this.userIdentity || !this.userIdentity.authorities) {
            return false;
        }

        for (let i = 0; i < authorities.length; i++) {
            if (this.userIdentity.authorities.indexOf(authorities[i]) !== -1) {
                return true;
            }
        }

        return false;
    }

    hasAuthority(authority: string): Promise<boolean> {
        if (!this.authenticated) {
           return Promise.resolve(false);
        }

        return this.identity().then((id) => {
            return Promise.resolve(id.authorities && id.authorities.indexOf(authority) !== -1);
        }, () => {
            return Promise.resolve(false);
        });
    }

    identity(force?: boolean): Promise<any> {
        if (force === true) {
            this.userIdentity = undefined;
        }

        // check and see if we have retrieved the userIdentity data from the server.
        // if we have, reuse it by immediately resolving
        if (this.userIdentity) {
            return Promise.resolve(this.userIdentity);
        }

        // retrieve the userIdentity data from the server, update the identity object, and then resolve.
        return this.account.get().toPromise().then((account) => {
            if (account) {
                this.userIdentity = account;
                this.authenticated = true;
                this.$sessionStorage.store('principal-userIdentity', JSON.stringify(account));
                this.$sessionStorage.store('principal-authenticated', true);
            } else {
                this.userIdentity = null;
                this.authenticated = false;
                this.$sessionStorage.clear('principal-userIdentity');
                this.$sessionStorage.clear('principal-authenticated');
            }
            this.authenticationState.next(this.userIdentity);
            return this.userIdentity;
        }).catch((err) => {
            this.userIdentity = null;
            this.authenticated = false;
            this.$sessionStorage.clear('principal-userIdentity');
            this.$sessionStorage.clear('principal-authenticated');
            this.authenticationState.next(this.userIdentity);
            return null;
        });
    }

    isAuthenticated(): boolean {
        return this.authenticated;
    }

    isIdentityResolved(): boolean {
        return this.userIdentity !== undefined;
    }

    getAuthenticationState(): Observable<any> {
        return this.authenticationState.asObservable();
    }

    getImageUrl(): String {
        return this.isIdentityResolved() ? this.userIdentity.imageUrl : null;
    }
}