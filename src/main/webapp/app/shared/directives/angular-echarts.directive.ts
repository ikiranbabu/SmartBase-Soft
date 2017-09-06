import {
    Directive, ElementRef, Renderer, Input, Output, HostListener, OnChanges, OnDestroy, SimpleChange, EventEmitter,
    DoCheck
} from '@angular/core';

declare var echarts: any;
/**
 * echarts directive support following input porperties:

//  options: It's the same with the options in official demo site.
//
//  dataset: You can ignore the "data" property in "series" of the options, and use dataset to bind the series data instead.
//
//  loading: boolean property. Use it to toggle the echarts loading animation when your data is not ready.
//
//  theme: use it to init echarts with theme. You need to include the theme file in .angular-cli.json or the index.html. For example, if we want to use dark.js in Echarts Themes Page:
//
//  <div echarts theme="dark" class="demo-chart" [options]="chartOptions"></div>
//  It exposes the echartsInstance (since v1.1.6) in 'chartInit' event. So you can directly call the APIs just like: resize(), showLoading(), etc. For example:
//
//  html:
//  <div echarts class="demo-chart" [options]="chartOptions" (chartInit)="onChartInit($event)"></div>
//  component:
//  onChartInit(ec) {
//   this.echartsIntance = ec;
// }
//
//  resizeChart() {
//   if (this.echartsIntance) {
//     this.echartsIntance.resize();
//   }
// }
//  Events
//
//  As echarts support the 'click', 'dblclick', 'mousedown', 'mouseup', 'mouseover', 'mouseout', 'globalout' mouse events, our ngx-echarts directive also support the same mouse events but with additional chart prefix.
//
//  html:
//  <div echarts class="demo-chart" [options]="chartOptions" (chartClick)="onChartClick($event)"></div>
//  The '$event' is same with the 'params' that Echarts dispatches
//  It supports following event outputs:
//
//  chartClick: It emits the same params of 'click' event
//  chartDblClick: It emits the same params of 'dblclick' event
//  chartMouseDown: It emits the same params of 'mousedown' event
//  chartMouseUp: It emits the same params of 'mouseup' event
//  chartMouseOver: It emits the same params of 'mouseover' event
//  chartMouseOut: It emits the same params of 'mouseout' event
//  chartGlobalOut: It emits the same params of 'globalout' event
//  chartContextMenu: It emits the same params of 'contextmenu' event (since v1.2.1)
//  chartDataZoom: It emits the same params of 'dataZoom' event (thanks to averhaegen)
//  You can refer to the echarts tutorial: Events and Actions in ECharts for more details of the event params. You can also refer to the demo page for the detailed example.
 */
@Directive({
    selector: '[echarts]'
})
export class AngularEchartsDirective implements OnChanges, OnDestroy {
    @Input() options: any;
    @Input() dataset: any[];
    @Input() theme = '';
    @Input() loading: boolean;

    // chart events:
    @Output() chartInit: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartDblClick: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartMouseDown: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartMouseUp: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartMouseOver: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartMouseOut: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartGlobalOut: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartContextMenu: EventEmitter<any> = new EventEmitter<any>();
    @Output() chartDataZoom: EventEmitter<any> = new EventEmitter<any>();

    private myChart: any = null;
    private currentWindowWidth: any = null;

    constructor(private el: ElementRef, private renderer: Renderer) {
    }

    private createChart() {
        this.theme = this.theme || '';
        this.currentWindowWidth = window.innerWidth;

        if (this.theme) {
            return echarts.init(this.el.nativeElement, this.theme);
        } else {
            return echarts.init(this.el.nativeElement);
        }
    }

    private updateChart() {
        this.myChart.setOption(this.options);
        this.myChart.resize();
    }

    @HostListener('window:resize', ['$event']) onWindowResize(event: any) {
        if (event.target.innerWidth !== this.currentWindowWidth) {
            this.currentWindowWidth = event.target.innerWidth;
            if (this.myChart) {
                this.myChart.resize();
            }
        }
    }

    ngOnChanges(changes: { [propertyName: string]: SimpleChange }) {
        if (changes['dataset']) {
            this.onDatasetChange(this.dataset);
        }

        // if (changes['options']) { //this will not change options if only change options value
            this.onOptionsChange(this.options);
        // }

        if (changes['loading']) {
            this.onLoadingChange(this.loading);
        }
    }

    ngOnDestroy() {
        if (this.myChart) {
            this.myChart.dispose();
            this.myChart = null;
        }
    }

    private onOptionsChange(opt: any) {
        if (opt) {
            if (!this.myChart) {
                this.myChart = this.createChart();

                // output echart instance:
                this.chartInit.emit(this.myChart);

                // register events:
                this.registerEvents(this.myChart);
            }

            // if (this.hasData()) {
            //     this.updateChart();
            // } else if (this.dataset && this.dataset.length) {
            //     this.mergeDataset(this.dataset);
                this.updateChart();
            // }
        }
    }

    private onDatasetChange(dataset: any[]) {
        if (this.myChart && this.options) {
            if (!this.options.series) {
                this.options.series = [];
            }

            this.mergeDataset(dataset);
            this.updateChart();
        }
    }

    private onLoadingChange(loading: boolean) {
        if (this.myChart) {
            if (loading) {
                this.myChart.showLoading();
            } else {
                this.myChart.hideLoading();
            }
        }
    }

    private mergeDataset(dataset: any[]) {
        for (let i = 0, len = dataset.length; i < len; i++) {
            if (!this.options.series[i]) {
                this.options.series[i] = { data: dataset[i] };
            } else {
                this.options.series[i].data = dataset[i];
            }
        }
    }

    /**
     * method to check if the option has dataset.
     */
    private hasData(): boolean {
        if (!this.options.series || !this.options.series.length) {
            return false;
        }

        for (let serie of this.options.series) {
            if (serie.data && serie.data.length > 0) {
                return true;
            }
        }

        return false;
    }

    private registerEvents(myChart: any) {
        if (myChart) {
            // register mouse events:
            myChart.on('click', (e: any) => { this.chartClick.emit(e); });
            myChart.on('dblClick', (e: any) => { this.chartDblClick.emit(e); });
            myChart.on('mousedown', (e: any) => { this.chartMouseDown.emit(e); });
            myChart.on('mouseup', (e: any) => { this.chartMouseUp.emit(e); });
            myChart.on('mouseover', (e: any) => { this.chartMouseOver.emit(e); });
            myChart.on('mouseout', (e: any) => { this.chartMouseOut.emit(e); });
            myChart.on('globalout', (e: any) => { this.chartGlobalOut.emit(e); });
            myChart.on('contextmenu', (e: any) => { this.chartContextMenu.emit(e); });

            // other events;
            myChart.on('dataZoom', (e: any) => { this.chartDataZoom.emit(e); });
        }
    }
}
