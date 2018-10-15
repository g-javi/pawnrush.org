import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaderBoardComponent } from './components/leader-board/leader-board.component';
import { RouterModule } from '@angular/router';

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
  exports: [RouterModule]
})
export class RankingModule { }
