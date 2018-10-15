import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  $: any = window['jQuery'];

  constructor(private _location: Location) { }

  ngOnInit() {
    
      'use strict'; // Start of use strict

      // Activate scrollspy to add active class to navbar items on scroll
      this.$('body').scrollspy({
        target: '#mainNav',
        offset: 100
      });

      // Collapse Navbar
      const navbarCollapse = () => {
        if (this._location.path() === '') {
          if (this.$('#mainNav').offset().top > 100) {
            this.$('#mainNav').addClass('navbar-shrink');
          } else {
            this.$('#mainNav').removeClass('navbar-shrink');
          }
        }
      };
      // Collapse now if page is not at top
      navbarCollapse();
      // Collapse the navbar when page is scrolled
      this.$(window).scroll(navbarCollapse);

  }
}
