import { Component, OnInit, ElementRef, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { Location } from '@angular/common';
import { AppConfig } from '../../app.config';
declare let jQuery: any;

@Component({
  selector: '[sidebar]',
  templateUrl: './sidebar.template.html'
})

export class SidebarComponent implements OnInit, AfterViewInit {
  $el: any;
  config: any;
  router: Router;
  location: Location;

  constructor(config: AppConfig, el: ElementRef, router: Router, location: Location) {
    this.$el = jQuery(el.nativeElement);
    this.config = config.getConfig();
    this.router = router;
    this.location = location;
  }

  initSidebarScroll(): void {
    let $sidebarContent = this.$el.find('.js-sidebar-content');
    if (this.$el.find('.slimScrollDiv').length !== 0) {
      $sidebarContent.slimscroll({
        destroy: true
      });
    }
    $sidebarContent.slimscroll({
      height: window.innerHeight,
      size: '4px'
    });
  }

  changeActiveNavigationItem(location): void {
      let $newActiveLink = this.$el.find('a[href="#' + location.path().split('?')[0] + '"]');
      if ($newActiveLink.length === 0){
          $newActiveLink = this.$el.find('a[href^="#' + location.path().split(';')[0] + '"]');
      }
      if ($newActiveLink.length === 0){
          $newActiveLink = this.$el.find('a[href^="#' + location.path().split(')')[0] + '"]');
      }
      if ($newActiveLink.length === 0){
          $newActiveLink = this.$el.find('a[href^="#' + location.path().split('//')[0] + '"]');
      }
      if ($newActiveLink.length === 0){
          let tmp = location.path().split('~')[0];
          if (tmp.endsWith('/')){
              tmp = tmp.slice(0, -1);
          }
          $newActiveLink = this.$el.find('a[href^="#' + tmp + '"]');
      }
      if ($newActiveLink){
          $newActiveLink = jQuery($newActiveLink[0]);
      }
      // collapse .collapse only if new and old active links belong to different .collapse
      if (!$newActiveLink.is('.active > .collapse > li > a')) {
          this.$el.find('.active .active').closest('.collapse').collapse('hide');
      }
      this.$el.find('.sidebar-nav .active').removeClass('active');

      $newActiveLink.closest('li').addClass('active')
          .parents('li').addClass('active');
      //show collapse
      if (this.config.state['nav-static']) {
        $newActiveLink.closest('.collapse').collapse('show');
      }

      // uncollapse parent
      $newActiveLink.closest('.collapse').addClass('in').css('height', '')
          .siblings('a[data-toggle=collapse]').removeClass('collapsed');

  }

  ngAfterViewInit(): void {
    this.changeActiveNavigationItem(this.location);
  }

  ngOnInit(): void {
    jQuery(window).on('sn:resize', this.initSidebarScroll.bind(this));
    this.initSidebarScroll();

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.changeActiveNavigationItem(this.location);
      }
    });
  }
}
