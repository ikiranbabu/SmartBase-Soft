import { Pipe, PipeTransform } from '@angular/core';
import { SharedCodeService } from "../code/shared.code.service";

@Pipe({
    name: 'durationTime',
    // pure: false
})
export class DurtionTimePipe implements PipeTransform {

    constructor(){}

    transform(secondTime: string): any {
        if (!secondTime) {
            return secondTime;
        }

        let second = parseInt(secondTime, 10);
        if (!second) {
            return secondTime;
        }
        if (second < 60) {
            return  '小于1分钟';
        } else {
            return Math.round(second / 60) + '分钟';
        }
    }
}
