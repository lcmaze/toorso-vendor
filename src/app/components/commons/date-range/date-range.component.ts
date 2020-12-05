import { Component, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-date-range',
  templateUrl: './date-range.component.html',
  styleUrls: ['./date-range.component.scss']
})
export class DateRangeComponent implements OnInit {
  
  displayval : boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

  toggledate(){
    this.displayval = !this.displayval;
  }

}
