import { Component, OnInit } from '@angular/core';


declare var jQuery: any;

@Component({
  selector: 'ngnizr-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    jQuery('.collapsible').collapsible();
  }

}
