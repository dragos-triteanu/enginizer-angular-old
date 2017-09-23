import { AfterContentChecked, Component, EventEmitter, OnInit, Output } from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'enginizer-dropdown',
  templateUrl: './droptdown.component.html',
  styleUrls: ['./droptdown.component.scss']
})

export class DroptdownComponent implements OnInit, AfterContentChecked {

  currentUserName: string = "";

  @Output("logout")
  logout: EventEmitter<any> = new EventEmitter();

  constructor() {

  }

  userlogout() {
    this.logout.emit();
  }

  ngOnInit() {
    jQuery(".dropdown-button").dropdown({
      belowOrigin: true
    });
    this.currentUserName = JSON.parse(localStorage.getItem("current_user")).fullName;
  }

  ngAfterContentChecked(): void {
    this.currentUserName = JSON.parse(localStorage.getItem("current_user")).fullName;
  }

}
