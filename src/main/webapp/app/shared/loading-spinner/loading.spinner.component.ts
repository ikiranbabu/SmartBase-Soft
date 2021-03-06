import {
    Component, ViewEncapsulation, OnDestroy, Input
} from '@angular/core';

@Component({
    selector: 'loading-spinner',
    styleUrls: ['./loading.spinner.component.scss'],
    templateUrl: './loading.spinner.component.html',
    encapsulation: ViewEncapsulation.None,
})
export class LoadingSpinnerComponent implements OnDestroy {
    private currentTimeout: any;
    public isDelayedRunning = false;

    @Input()
    public delay = 300;

    @Input()
    public set isRunning(value: boolean) {
        if (!value) {
            this.cancelTimeout();
            this.isDelayedRunning = false;
            return;
        }

        if (this.currentTimeout) {
            return;
        }

        this.currentTimeout = setTimeout(() => {
            this.isDelayedRunning = value;
            this.cancelTimeout();
        }, this.delay);
    }

    private cancelTimeout(): void {
        clearTimeout(this.currentTimeout);
        this.currentTimeout = undefined;
    }

    ngOnDestroy(): any {
        this.cancelTimeout();
    }
}
