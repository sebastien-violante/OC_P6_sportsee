import { DateTime } from 'luxon';

export default function getCurrentWeek(date) {
    const weekStart = date.startOf("week")
    const weekEnd = date.endOf("week")
    
    return { weekStart, weekEnd }
}