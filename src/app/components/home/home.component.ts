import { Component, OnInit } from '@angular/core';


declare var jQuery:any;

@Component({
  selector: 'enginizer-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    jQuery('.collapsible').collapsible();
  }

}