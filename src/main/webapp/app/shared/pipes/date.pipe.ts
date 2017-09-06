
import { Pipe, PipeTransform } from '@angular/core';
import { SharedCodeService } from "../code/shared.code.service";
import { JhiDateUtils } from "ng-jhipster";
import { DatePipe } from "@angular/common";

@Pipe({
    name: 'dateTime',
    // pure: false
})
export class DateTimePipe implements PipeTransform {

    constructor(
    ){

    }

    transform(strTime: string): any {
        strTime = strTime.replace("-", "/");
        strTime = strTime.replace("-", "/");
        strTime = strTime.replace("T", " ");
        let formDate;
        if (strTime.indexOf("+") > 0) {
            formDate = strTime.split("+")[0];
        } else {
            formDate = strTime.split("Z")[0];
        }
        let date = new Date(formDate);
        let time = this.FormatNum(date.getHours()) + ":"
            + this.FormatNum(date.getMinutes()) + ":" + this.FormatNum(date.getSeconds());
        return date.getFullYear() + "-" + this.FormatNum(date.getMonth() + 1) +
            "-" + this.FormatNum(date.getDate()) + " " + time;
    }

    //格式化时间，如果不足2位，前面补0
    private FormatNum(strTime) {
        if (strTime < 10) {
            return "0" + strTime;
        } else {
            return strTime;
        }
    }
}
