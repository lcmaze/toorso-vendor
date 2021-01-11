import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { EditBoxComponent } from '../edit-box/edit-box.component';

@Component({
  selector: 'app-main-box',
  templateUrl: './main-box.component.html',
  styleUrls: ['./main-box.component.scss']
})
export class MainBoxComponent implements OnInit {

  @Input('editable') editable: boolean = false;
  @Input('products') products: any = null;
  @Input('prices') prices: any = null;
  @Input('addons') addons: any = null;
  @ViewChild('editBox') editBox: EditBoxComponent;
  @Output('add-new') addNewTable: any = new EventEmitter();
  @Output('delete') deleteTable: any = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    // console.log("main-box => ",this.prices, this.products, this.addons);
  }

  edit(){
    this.editable = true;
  }

  save(){
    this.editable = false;
    this.editBox.saveProduct();
  }

  addNew(){
    this.addNewTable.emit(true);
  }

  delete(){
    this.deleteTable.emit(true);
  }

}
