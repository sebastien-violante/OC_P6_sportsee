import getActivityPosition from "../../utils/getActivityPosition";
import getBpmPosition from "../../utils/getBpmPosition";
import { activitiesMock } from "../mock/activities"
import { DateTime } from 'luxon';

export function formatDistanceFourWeeks(distIndexDate, activities) {

    const distPerWeek = Array(4).fill(0);
    let distTotal = 0
    activities.forEach(activity => {
        const index = getActivityPosition(activity.date, distIndexDate);
        if (index === null) {
            return 
        } else {
            distPerWeek[index] += activity.distance;
            distTotal+=activity.distance
        }
    });
    
    return {
        distAverage : Number((distTotal/4).toFixed(1)),
        distances : distPerWeek.map((value, i) => ({ name: `S${i + 1}`, distance: value === 0 ? null : value }))
    }
    
}

export function formatBpmOneWeek() {

}

export function formatCurrentWeekActivities() {

}