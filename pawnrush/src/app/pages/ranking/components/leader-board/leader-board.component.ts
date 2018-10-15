import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.scss']
})
export class LeaderBoardComponent implements OnInit {
  $: any = window['jQuery'];

  constructor() { }

  ngOnInit() {
    this.$('body').scrollspy({
      target: '#mainNav',
      offset: 100
    });
    this.$('#mainNav').addClass('navbar-shrink');
  }

}
