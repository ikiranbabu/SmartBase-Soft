
import { Pipe, PipeTransform } from '@angular/core';
import { SharedCodeService } from "../code/shared.code.service";
import { JhiDateUtils} from "ng-jhipster";
import {DatePipe} from "@angular/common";

@Pipe({
    name: 'durationDate',
    // pure: false
})
export class DurationDatePipe implements PipeTransform {

    constructor(
        private datePipe: DatePipe,
        private dateUtils: JhiDateUtils
    ){

    }

    transform(time: string): any {
        let val = Date.parse(time);
        let date = new Date(val);
        date.setDate(date.getDay() + 7);
    }
}
