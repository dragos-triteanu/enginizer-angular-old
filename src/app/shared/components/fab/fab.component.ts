import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'ngnizr-fab',
  templateUrl: './fab.component.html',
  styleUrls: ['./fab.component.scss']
})
export class FabComponent implements OnInit {

  @Output('onClick')
  onClick: EventEmitter<any> = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
  }

  fabClick() {
    this.onClick.emit();
  }

}
