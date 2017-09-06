import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'name',
    // pure: false
})
export class NamePipe implements PipeTransform {
    transform(obj: any): any {
        console.log('>>>> Name Pipe obj: ', obj);
        if (!obj) {
            return obj;
        }

        return obj['name'];
    }
}
