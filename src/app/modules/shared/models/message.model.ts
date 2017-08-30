import { User } from './user.model';

export class Message {

  id:string;
  from:User;
  to:User;
  text:string;
  dateSent:Date;

  constructor(id:string, from:User, to:User, text:string) {
    this.id = id;
    this.from = from;
    this.to = to;
    this.text = text;
  }

}
