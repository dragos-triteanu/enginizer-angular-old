/**
 * Created by drago on 2/2/2017.
 */
import { Pipe, PipeTransform } from '@angular/core';
import { CardModel } from '../models/case.model';

@Pipe({ name: 'byCaseStatusPipe' , pure: false })
export class ByCaseStatusPipe implements PipeTransform {
  transform(allCases: CardModel[], status) {
    return allCases.filter(theCase => theCase.status === status);
  }
}
