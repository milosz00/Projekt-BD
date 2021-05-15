import { Pipe, PipeTransform } from '@angular/core';
import { Visit } from '../models/visit';

@Pipe({
  name: 'getVisitByDates'
})
export class GetVisitByDatesPipe implements PipeTransform {

  transform(visits: Array<Visit>, startDate: Date, endDate: Date): unknown {
    return visits.filter(item => (startDate <= item.startDate && item.startDate <= endDate) === true);
  }

}