import {Component, OnInit, Input} from '@angular/core';
import {AuthenticationService} from "../../../auth/services/authentication.service";
import {environment} from "../../../../environments/environment";
import { Message } from '../../../shared/models/message.model';

@Component({
  selector: 'enginizer-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.scss']
})
export class MessagesComponent implements OnInit {

  @Input("messages")
  messages:Message[];

  constructor(private authenticationService:AuthenticationService) {
  }

  ngOnInit() {
  }

  isIncomingMessage(message:Message) {
    var currentUser = this.authenticationService.getCurrentUser();
    if (message.to.id == currentUser.userId) {
      return true;
    }
    return false;
  }

  isOutgoingMessage(message:Message) {
    var currentUser = this.authenticationService.getCurrentUser();
    if (message.from.id == currentUser.userId) {
      return true;
    }
    return false;
  }

  computeAvatar(message) {
    if (this.authenticationService.isUserWithRole("DOCTOR") && message.from.role === "DOCTOR") {
      return environment.doctorAvatar;
    }
    if (!this.authenticationService.isUserWithRole("DOCTOR") && message.from.role === "DOCTOR") {
      return environment.doctorAvatar;
    }
    return environment.userAvatar;
  }

}