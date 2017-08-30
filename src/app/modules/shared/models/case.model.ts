/**
 * Created by drago on 1/29/2017.
 */

import { User } from './user.model';

export class Case {
  id: number;
  mainSymptoms: string;
  doctor: User;
  user: User;
  fileUrls: any[];
  hoursRemaining: number;
  status: string;

  constructor(id: number, mainSymptoms: string, filesUrls: any[],doctor: User, user: User, hoursRemaining: number, status: string) {
    this.id = id;
    this.mainSymptoms = mainSymptoms;
    this.fileUrls = filesUrls;
    this.doctor = doctor;
    this.user = user
    this.hoursRemaining = hoursRemaining;
    this.status = status;
  }
}
