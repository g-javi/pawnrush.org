import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'pawnrush';

  ngOnInit() {
    (function ($: any) {
      'use strict'; // Start of use strict

      // Smooth scrolling using jQuery easing
      $(document).on('click', 'a.js-scroll-trigger[href*="#"]:not([href="#"])', function () {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
          let target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
          if (target.length) {
            $('html, body').animate({
              scrollTop: (target.offset().top - 70)
            }, 1000, 'easeInOutExpo');
            return false;
          }
        }
      });

      // Closes responsive menu when a scroll trigger link is clicked
      $('.js-scroll-trigger').click(function () {
        $('.navbar-collapse').collapse('hide');
      });
     
    })(window['jQuery']); // End of use strict
  }
}
