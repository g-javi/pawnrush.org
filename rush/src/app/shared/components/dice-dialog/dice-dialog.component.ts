import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { of } from 'rxjs';

@Component({
  selector: 'app-dice-dialog',
  templateUrl: './dice-dialog.component.html',
  styleUrls: ['./dice-dialog.component.scss']
})
export class DiceDialogComponent implements OnInit {

  constructor(private _dialogRef: MatDialogRef<DiceDialogComponent>) { }

  roll$ = of('');
  success = false;
  ngOnInit() {
    this.roll();
  }


  onNoClick(): void {
    this._dialogRef.close(false);
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    // The maximum is exclusive and the minimum is inclusive
    return Math.floor(Math.random() * (max - min)) + min;
  }

  roll() {
    const success = this.getRandomInt(1, 6);
    this.success = success > 2 ? true : false;
    this.roll$ = of(success);
  }

}
