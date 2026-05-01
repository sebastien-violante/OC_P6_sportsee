import { DateTime } from 'luxon';

export default function changePeriod(slot, type, date) {
    if(type === "previous") {
      if(slot === "week") {
        return date.minus({ weeks: 1 })
      } else {
        return date.minus({ days: 1 })
      }
    } else {
      if(slot === "week") {
        return date.plus({ weeks: 1 })
      } else {
        return date.plus({ days: 1 })
      }
    }
}