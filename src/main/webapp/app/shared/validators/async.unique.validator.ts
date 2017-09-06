import { Attribute, Directive, forwardRef, Input } from "@angular/core";
import { NG_ASYNC_VALIDATORS, Validator, AbstractControl } from "@angular/forms";
import { Http } from "@angular/http";
import { validate } from "codelyzer/walkerFactory/walkerFn";
@Directive({
    selector: `[asyncUniqueValidator][validateUrl][formControlName],[asyncUniqueValidator][validateUrl][ngModel]`,
    providers: [
        {
            provide: NG_ASYNC_VALIDATORS,
            useExisting: forwardRef(() => AsyncUniqueValidatorDirective), multi: true
        }
    ]
})

export class AsyncUniqueValidatorDirective implements Validator {
    @Input()
    validateUrl: string;
    asyncTimeout: any;

    constructor(private http: Http) {
        console.log('>>> AsyncUniqueValidatorDirective <<<, validateUrl: ');
    }

    validate(c: AbstractControl): { [p: string]: any } {

        return new Promise(resolve => {
                this.asyncTimeout = setTimeout(() => {
                    console.log('>>> validate: ', c.value);
                    if (!c.value) {
                        return resolve(null);
                    }
                    this.http.get(this.validateUrl + '/' + c.value)
                        .map((res) => {
                            let jsonResponse = res.text() ? res.json() : undefined;
                            return jsonResponse;
                        }).subscribe((jsonResponse) => {
                            if (jsonResponse) {
                                resolve({unique: true});
                            } else {
                                resolve(null);
                            }
                        }
                    );
                }, 800);
            }
        );
    }

}
