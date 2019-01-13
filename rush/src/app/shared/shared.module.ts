import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DiceDialogComponent } from './components/dice-dialog/dice-dialog.component';
import { MatDialogModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    DiceDialogComponent
  ],
  imports: [
    MatDialogModule,
    MatButtonModule
  ],
  exports: [
    FlexLayoutModule,
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    DragDropModule
  ],
  entryComponents: [
    DiceDialogComponent
  ],
  bootstrap: [
    DiceDialogComponent
  ]
})
export class SharedModule { }
