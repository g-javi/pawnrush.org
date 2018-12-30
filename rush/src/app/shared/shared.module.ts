import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DragDropModule } from '@angular/cdk/drag-drop';


@NgModule({
  declarations: [],
  imports: [
  ],
  exports: [
    FlexLayoutModule,
    CommonModule,
    DragDropModule
  ]
})
export class SharedModule { }
