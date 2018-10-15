import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RankingService {
  history: string[] = [];
  initialRating = 1000
  K = 50
  champion = ''

  playerlist = {}

  probability(rating1, rating2) {
      return 1.0 * 1.0 / (1 + 1.0 * Math.pow(10, 1.0 * (rating1 - rating2) / 400))
  }

  eloRating(winner, loser, K) {
    let Rwinner = this.playerlist[winner]
    let Rloser = this.playerlist[loser]

    const Pl = this.probability(Rwinner, Rloser)

    const Pw = this.probability(Rloser, Rwinner)

    Rwinner = Rwinner + K * (1 - Pw)
    Rloser = Rloser + K * (0 - Pl)

    this.playerlist[winner] = Rwinner
    this.playerlist[loser] = Rloser
  }

  linealChampion(winner, loser) {
    if (this.champion === '' || this.champion === loser) {
      this.champion = winner
    }
  }

  currentRankings(): {
    champion: string;
    rankings: string[][]
  } {
    this.playerlist = {};
    this.history.forEach(match => {
      const matchPlayers = match.split(',')
      const winner = matchPlayers[0]
      const loser = matchPlayers[1].trim()
      if (!this.playerlist.hasOwnProperty(winner)) {
        this.playerlist[winner]= this.initialRating;
      }
      if (!this.playerlist.hasOwnProperty(loser)) {
        this.playerlist[loser]= this.initialRating;
      }
      this.eloRating(winner, loser, this.K)
      this.linealChampion(winner, loser)
    });
    const sortable = [];
    for (let player in this.playerlist) {
        sortable.push([player, this.playerlist[player]]);
    }
    
    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });

    return {
      champion: this.champion,
      rankings: sortable
    }
  }


}
