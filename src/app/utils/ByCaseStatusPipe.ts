/**
 * Created by drago on 2/2/2017.
 */
import { Pipe, PipeTransform } from '@angular/core';
import {Case} from "../models/case";

@Pipe({ name: 'byCaseStatusPipe' , pure: false })
export class ByCaseStatusPipe implements PipeTransform {
  transform(allCases: Case[], status) {
    return allCases.filter(theCase => theCase.status === status);
  }
}
