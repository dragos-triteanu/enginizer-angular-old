import { Component, Input, OnInit } from '@angular/core';
import { CardModel } from '../../../../shared/models/case.model';

@Component({
  selector: 'ngnizr-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit {
  @Input()
  card: CardModel;

  constructor() {
  }


  ngOnInit() {
  }


}
