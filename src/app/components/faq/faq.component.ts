import { Component, OnInit } from '@angular/core';


declare var jQuery:any;

@Component({
  selector: 'enginizer-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    jQuery('.collapsible').collapsible();
  }

}
