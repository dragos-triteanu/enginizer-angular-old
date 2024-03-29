﻿import { Component, OnInit } from '@angular/core';

import { AlertService } from '../../services/index';

@Component({
  moduleId: module.id,
  selector: 'ngnizr-alert',
  templateUrl: 'alert.component.html'
})

export class EnginizerAlertComponent implements OnInit {
  message: any;

  constructor(private alertService: AlertService) {
  }

  ngOnInit() {
    this.alertService.getMessage().subscribe(message => {
      this.message = message;
    });
  }
}
