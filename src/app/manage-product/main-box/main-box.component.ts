import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-box',
  templateUrl: './main-box.component.html',
  styleUrls: ['./main-box.component.scss']
})
export class MainBoxComponent implements OnInit {

  @Input('editable') editable: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  edit(){
    this.editable = true;
  }

  save(){
    this.editable = false;
  }

}
