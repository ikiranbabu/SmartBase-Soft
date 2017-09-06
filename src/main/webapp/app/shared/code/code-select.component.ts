import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharedCodeService } from "./shared.code.service";

@Component({
    selector: 'code-select',
    templateUrl: './code-select.component.html',
})
export class CodeSelectComponent implements OnInit{

    @Input() groupCode: string;
    @Output() codes: EventEmitter<any>;

    constructor(private sharedCodeService: SharedCodeService){
        this.codes = new EventEmitter();
    }
    ngOnInit(): void {
        this.sharedCodeService.getCodeByCodeGroup(this.groupCode).subscribe(
            resp => {
               let result =  resp.json();
               console.log(result);
               this.codes.emit(result);
            },
            resp => {
                console.log(resp);
            }
        );
        // this.codes.emit([{code: 'A', name: 'Active'}]);
    }

}
