import { Component, OnInit, AfterViewInit, Renderer, ElementRef, ViewEncapsulation, OnDestroy } from '@angular/core';
// import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { JhiEventManager } from 'ng-jhipster';
import { LoginService } from "../shared/login/login.service";
import { StateStorageService } from "../shared/auth/state-storage.service";
import { Particle } from "../shared/particale/particle";

@Component({
  selector: 'login',
  styleUrls: [ './login.style.scss' ],
  templateUrl: './login.template.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'login-page app'
  }
})
export class LoginComponent implements OnInit, AfterViewInit, OnDestroy {
    authenticationError: boolean;
    password: string;
    rememberMe: boolean;
    username: string;
    credentials: any;
    isRequesting: boolean;
    particle: Particle;

    constructor(
        private eventManager: JhiEventManager,
        private loginService: LoginService,
        private stateStorageService: StateStorageService,
        private elementRef: ElementRef,
        private renderer: Renderer,
        private router: Router,
        // public activeModal: NgbActiveModal
    ) {
        this.credentials = {};

    }

    ngOnInit() {
        this.isRequesting = false;
    }

    ngOnDestroy() {
        // this.particle.destroy();
    }

    ngAfterViewInit() {
        // this.renderer.invokeElementMethod(this.elementRef.nativeElement.querySelector('#username'), 'focus', []);
        // this.particle = new Particle(this.elementRef.nativeElement,
        //     {
        //         atomColor: '#FFFFF4',
        //         interactive: true,
        //         density: 'low',
        //         velocity: 'slow'
        //     });
    }

    cancel () {
        this.credentials = {
            username: null,
            password: null,
            rememberMe: true
        };
        this.authenticationError = false;
        // this.activeModal.dismiss('cancel');
    }

    login () {
        this.isRequesting = true;
        this.loginService.login({
            username: this.username,
            password: this.password,
            rememberMe: this.rememberMe
        }).then(() => {
            this.isRequesting = false;
            this.authenticationError = false;
            // this.activeModal.dismiss('login success');
            if (this.router.url === '/register' || (/activate/.test(this.router.url)) ||
                this.router.url === '/finishReset' || this.router.url === '/requestReset') {
                this.router.navigate([this.router.url]);
            }

            this.eventManager.broadcast({
                name: 'authenticationSuccess',
                content: 'Sending Authentication Success'
            });

            // // previousState was set in the authExpiredInterceptor before being redirected to login modal.
            // // since login is succesful, go to stored previousState and clear previousState
            // let previousState = this.stateStorageService.getPreviousState();
            // if (previousState) {
            //     this.stateStorageService.resetPreviousState();
            //     this.router.navigate([previousState.name], { queryParams:  previousState.params });
            // }
            // let redirect = this.stateStorageService.getUrl();
            // if (redirect) {
            //     this.router.navigate([redirect]);
            // }
            this.router.navigate(['app']);
        }).catch(() => {
            this.isRequesting = false;
            this.authenticationError = true;
        });
    }

    register () {
        // this.activeModal.dismiss('to state register');
        this.router.navigate(['/register']);
    }

    requestResetPassword () {
        // this.activeModal.dismiss('to state requestReset');
        this.router.navigate(['/reset', 'request']);
    }
}

