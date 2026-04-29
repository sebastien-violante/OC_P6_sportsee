import getActivityPosition from "../../utils/getActivityPosition";
import getBpmPosition from "../../utils/getBpmPosition";
import { activitiesMock } from "../mock/activities"
import { DateTime } from 'luxon';

export function fourWeeksDistances(distIndexDate) {
    const distPerWeek = Array(4).fill(0);
    let distTotal = 0
    activitiesMock.forEach(activity => {
        const index = getActivityPosition(activity.date, distIndexDate);
        console.log(index)
        if (index === null) {
            return 
        } else {
            distPerWeek[index] += activity.distance;
            distTotal+=activity.distance
        }
    });

    return {
        distAverage : Number((distTotal/4).toFixed(1)),
        distances : distPerWeek.map((value, i) => ({ name: `S${i + 1}`, distance: value }))
    }
}

export function lastWeekBpm(bpmIndexDate) {
    
    const bpmPerDay = Array(7).fill(null).map(() => ({
        min: 0,
        max: 0,
        avg: 0
    }));

    activitiesMock.forEach(activity => {
        const index = getBpmPosition(activity.date, bpmIndexDate);
        if (index === null) return;

        bpmPerDay[index] = {
            min: activity.heartRate.min,
            max: activity.heartRate.max,
            avg: activity.heartRate.average
        };
    });

    const days = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'];

    return bpmPerDay.map((val, i) => ({
        name: days[i],
        ...val
    }));
    
    
}

