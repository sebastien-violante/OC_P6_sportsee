import { DateTime } from 'luxon';

export default function getBpmPosition(date, referenceDate) {

    const activity = DateTime.fromISO(date).startOf('day');
    const reference = DateTime.fromISO(referenceDate).startOf('day');
    const periodStart = reference.minus({ days: 7 });
    const diffDays = Math.floor(activity.diff(periodStart, 'days').days);
    
    if (diffDays >= 0 && diffDays < 7) {
        return diffDays;
    }
    return null;
}