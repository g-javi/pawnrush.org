import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderBoardComponent } from './components/leader-board/leader-board.component';
import { RouterModule } from '@angular/router';
import { RankingService } from './services/ranking.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      {
        path: '',
        component: LeaderBoardComponent
      }
    ])
  ],
  declarations: [LeaderBoardComponent],
  providers: [RankingService],
  exports: [RouterModule]
})
export class RankingModule { }
