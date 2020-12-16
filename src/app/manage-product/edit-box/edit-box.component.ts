import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-edit-box',
  templateUrl: './edit-box.component.html',
  styleUrls: ['./edit-box.component.scss']
})
export class EditBoxComponent implements OnInit {

  @Input('editable') editable: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  style(): object {
    if (this.editable) {
      return {
        opacity: 1,
        pointerEvents: 'unset'
      }
    }
    else {
      return {
        opacity: 0.8,
        pointerEvents: 'none'
      }
    }
  }

}
