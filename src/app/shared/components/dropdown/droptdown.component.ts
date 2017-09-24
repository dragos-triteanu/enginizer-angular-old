import {AfterContentChecked, Component, EventEmitter, OnInit, Output} from '@angular/core';

declare var jQuery: any;

@Component({
  selector: 'ngnizr-dropdown',
  templateUrl: './droptdown.component.html',
  styleUrls: ['./droptdown.component.scss']
})

export class DropdownComponent implements OnInit, AfterContentChecked {

  currentUserName = '';

  @Output('onLogout')
  onLogout: EventEmitter<any> = new EventEmitter();

  constructor() {

  }

  userlogout() {
    this.onLogout.emit();
  }

  ngOnInit() {
    jQuery('.dropdown-button').dropdown({
      belowOrigin: true
    });
    this.currentUserName = JSON.parse(localStorage.getItem('current_user')).fullName;
  }

  ngAfterContentChecked(): void {
    this.currentUserName = JSON.parse(localStorage.getItem('current_user')).fullName;
  }

}
