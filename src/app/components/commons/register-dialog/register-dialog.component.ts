import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'register-dialog',
  templateUrl: './register-dialog.component.html',
  styleUrls: ['./register-dialog.component.scss']
})
export class RegisterDialogComponent implements OnInit {

  @Output('close') closeBtn: any = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
  }

}
