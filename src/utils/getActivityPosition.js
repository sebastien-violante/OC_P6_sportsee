import { DateTime } from 'luxon';

export default function getActivityPosition(date, referenceDate) {

    const activity = DateTime.fromISO(date).startOf('week');
    const reference = DateTime.fromISO(referenceDate).startOf('week');
    const periodStart = reference.minus({ weeks: 3 });
    const diffWeeks = Math.floor(activity.diff(periodStart, 'weeks').weeks);
    
    if (diffWeeks >= 0 && diffWeeks < 4) {
        return diffWeeks;
    }
    return null;
}