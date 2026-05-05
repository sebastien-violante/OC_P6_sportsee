import getActivityPosition from "../../utils/getActivityPosition";
import getBpmPosition from "../../utils/getBpmPosition";
import { DateTime } from 'luxon';

export function formatDistanceFourWeeks(distIndexDate, activities) {

    if (!activities || !Array.isArray(activities)) {
        return {
            distAverage: 0,
            distances: Array(4).fill(null).map((_, i) => ({ name: `S${i + 1}`, distance: null }))
        }
    }

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

export function formatBpmOneWeek(bpmIndexDate, activities) {
    
    if (!activities || !Array.isArray(activities)) {
        return {
        averageBpm: 0,
        bpmPerDay: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'].map(name => ({
            name,
            min: null,
            max: null,
            avg: null
        }))
        }
    }
    
    let totalBpm = 0
    let records = 0
    const bpmPerDay = Array(7).fill(null).map(() => ({
        min: null,
        max: null,
        avg: null
    }));
    
    activities.forEach(activity => {
        const index = getBpmPosition(activity.date, bpmIndexDate);
        if (index === null) return;
        totalBpm+=activity.heartRate.average
        records++
        bpmPerDay[index] = {
            min: activity.heartRate.min === 0 ? null : activity.heartRate.min,
            max: activity.heartRate.max === 0 ? null : activity.heartRate.max,
            avg: activity.heartRate.average === 0 ? null : activity.heartRate.average
        };
    });
    
        const days = ['Lun','Mar','Mer','Jeu','Ven','Sam','Dim'];
    
        return {
            averageBpm : Number((totalBpm/records).toFixed(0)),
            bpmPerDay : bpmPerDay.map((val, i) => ({ name: days[i], ...val }))
        }
}

export function formatCurrentWeekActivities(start, end, activities) {
    const startMs = start.toMillis();
    const endMs = end.toMillis();
    let weekActivities = 0
    let weekDistance = 0
    let weekDuration = 0
    activities.forEach(activity => {
        const activityMs = DateTime.fromISO(activity.date).toMillis();
            
        if (activityMs >= startMs && activityMs <= endMs) {
            weekActivities++
            weekDistance+=activity.distance
            weekDuration+=activity.duration
        }
    })
    return {weekActivities, weekDistance, weekDuration}
}

export function calculateBurntCalories(activities) {

    let burntCalories = 0
    activities.forEach(activity => {
        burntCalories+=activity.caloriesBurned}
    )

    return burntCalories
}
    