import { CUSTOM_ELEMENTS_SCHEMA, NgModule, Sanitizer } from "@angular/core";
import { SharedCodeService } from "./code/shared.code.service";
import { JhiLanguageHelper } from "./language/language.helper";
import { customHttpProvider } from "../blocks/interceptor/http.provider";
import { LoginService } from "./login/login.service";
import { LoginModalService } from "./login/login-modal.service";
import { AccountService } from "./auth/account.service";
import { StateStorageService } from "./auth/state-storage.service";
import { Principal } from "./auth/principal.service";
import { CSRFService } from "./auth/csrf.service";
import { AuthServerProvider } from "./auth/auth-jwt.service";
import { AuthService } from "./auth/auth.service";
import { UserService } from "./user/user.service";
import { JhiAlertService, NgJhipsterModule } from "ng-jhipster";
import { Title } from "@angular/platform-browser";
import { DatePipe } from "@angular/common";
import { PasswordResetInitService } from "../account/password-reset/init/password-reset-init.service";
import { PasswordResetFinishService } from "../account/password-reset/finish/password-reset-finish.service";
import { Register } from "../account/register/register.service";
import { SmsService } from "./sms/sms.service";
import { CookieService } from "ngx-cookie";

@NgModule({
    imports: [
    ],
    declarations: [
    ],
    providers: [
        JhiLanguageHelper,
        SharedCodeService,
        CookieService,
        LoginService,
        LoginModalService,
        AccountService,
        StateStorageService,
        Principal,
        CSRFService,
        AuthServerProvider,
        AuthService,
        UserService,
        DatePipe,
        Title,
        PasswordResetInitService,
        PasswordResetFinishService,
        Register,
        SmsService
    ],
    entryComponents: [],
    exports: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class CoreModule {}
