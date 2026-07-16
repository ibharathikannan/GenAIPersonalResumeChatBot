import { Pipe, PipeTransform } from '@angular/core';
import { TimeSlotModel } from '../models/time-slot.model';

@Pipe({
    name: 'timeslotFilter',
    pure: false
})
export class TimeSlotFilterPipe implements PipeTransform {
    transform(items: TimeSlotModel[], filter: Date): any {
        if (!items || !filter) {
            return items;
        }
        // filter items array, items which match and return true will be
        // kept, false will be filtered out
        return items.filter(item => item.startDateTime.getDate === filter.getDate);
    }
}