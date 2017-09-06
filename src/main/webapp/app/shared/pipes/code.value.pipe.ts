import { Pipe, PipeTransform } from '@angular/core';
import { SharedCodeService } from "../code/shared.code.service";

@Pipe({
    name: 'asyncCodeValue',
    // pure: false
})
export class CodeValuePipe implements PipeTransform {

    constructor(private shareCodeService: SharedCodeService){}

    transform(code: string, codeGroupCode: string): any {
        if (!code) {
            return code;
        }

        return this.shareCodeService.getCodeValue(code, codeGroupCode);
    }
}
