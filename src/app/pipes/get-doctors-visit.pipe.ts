import { Pipe, PipeTransform } from '@angular/core';
import { Visit } from '../models/visit';

@Pipe({
  name: 'getDoctorsVisit'
})
export class GetDoctorsVisitPipe implements PipeTransform {

  transform(items: Array<Visit>, doctorsKeys: Array<String>): Array<Visit> {
    return items.filter(item => doctorsKeys.includes(item.doctorKey) === true);
  }

}