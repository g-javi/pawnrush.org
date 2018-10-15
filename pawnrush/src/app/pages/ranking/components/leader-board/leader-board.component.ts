import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { RankingService } from '../../services/ranking.service';

@Component({
  selector: 'app-leader-board',
  templateUrl: './leader-board.component.html',
  styleUrls: ['./leader-board.component.scss']
})
export class LeaderBoardComponent implements OnInit {
  $: any = window['jQuery'];
  champion = '';
  rankings = [];
  round = Math.round;
  
  constructor(private _ranking: RankingService) { }

  ngOnInit() {
    this.$('body').scrollspy({
      target: '#mainNav',
      offset: 100
    });
    this.$('#mainNav').addClass('navbar-shrink');

    this.$.getJSON(`/api/history`).done(res => {
      this._ranking.history = res;
      const results = this._ranking.currentRankings();
      this.champion = results.champion;
      this.rankings = results.rankings;
    });
  }
}
