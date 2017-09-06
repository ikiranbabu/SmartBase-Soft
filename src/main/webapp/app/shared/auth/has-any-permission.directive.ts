import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Principal } from './principal.service';

/**
 * @whatItDoes Conditionally includes an HTML element if current user has any
 * of the permissions passed as the `expression`.
 *
 * @howToUse
 * ```
 *     <some-element *hasAnyPermission="'USER_ADD'">...</some-element>
 *
 *     <some-element *hasAnyPermission="['USER_ADD', 'USER_UPDATE']">...</some-element>
 * ```
 */
@Directive({
    selector: '[hasAnyPermission]'
})
export class HasAnyPermissionDirective {

    private permissions: string[];

    constructor(private principal: Principal, private templateRef: TemplateRef<any>, private viewContainerRef: ViewContainerRef) {
    }

    @Input()
    set hasAnyPermission(value: string|string[]) {
        this.permissions = typeof value === 'string' ? [ <string> value ] : <string[]> value;
        this.updateView();
        // Get notified each time authentication state changes.
        this.principal.getAuthenticationState().subscribe(identity => this.updateView());
    }

    private updateView(): void {
        this.principal.hasAnyPermission(this.permissions).then(result => {
            this.viewContainerRef.clear();
            if (result) {
                this.viewContainerRef.createEmbeddedView(this.templateRef);
            }
        });
    }
}
