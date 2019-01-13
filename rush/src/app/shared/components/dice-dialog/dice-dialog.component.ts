import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-dice-dialog',
  templateUrl: './dice-dialog.component.html',
  styleUrls: ['./dice-dialog.component.scss']
})
export class DiceDialogComponent implements OnInit {

  constructor(private _dialogRef: MatDialogRef<DiceDialogComponent>) { }

  ngOnInit() {
  }

  onNoClick(): void {
    this._dialogRef.close(false);
  }

}
