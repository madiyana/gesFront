import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-clavier',
  templateUrl: './clavier.component.html',
  styleUrls: ['./clavier.component.css']
})
export class ClavierComponent implements OnInit {
  @Input() qte;
  @Output() keyboardAdd: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }


  changeQte(val) {
    this.keyboardAdd.emit(val);
  }
}
