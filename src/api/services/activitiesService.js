import { activitiesMock } from "../mock/activities"

export function distanceOverFourWeeks() {
  
// 1 - récupération de la date du jour
const today = new Date()
let firstWeekDistance = 0
let secondWeekDistance = 0
let thirdWeekDistance = 0
let fourthWeekDistance = 0
let totalDistance = 0
    
// 2 - détermination de la date du dimanche précédent
   
// début de la semaine actuelle (dimanche ou lundi selon ton usage)
const dayInWeek = today.getDay()
const lastPeriodDay = new Date(today)
lastPeriodDay.setDate(today.getDate() - dayInWeek)
// 4 semaines avant
const firstPeriodDay = new Date(lastPeriodDay)
firstPeriodDay.setDate(lastPeriodDay.getDate() - 28)
// semaine 1
const week1Start = new Date(firstPeriodDay)
const week1End = new Date(firstPeriodDay)
week1End.setDate(firstPeriodDay.getDate() + 7)
// semaine 2
const week2Start = new Date(week1End)
const week2End = new Date(week1End)
week2End.setDate(week1End.getDate() + 7)
// semaine 3
const week3Start = new Date(week2End)
const week3End = new Date(week2End)
week3End.setDate(week2End.getDate() + 7)
// semaine 4
const week4Start = new Date(week3End)
const week4End = new Date(week3End)
week4End.setDate(week3End.getDate() + 7)
   
activitiesMock.map(activity => {
    const activityDate = new Date(activity.date)
    if(activityDate > firstPeriodDay && activityDate < lastPeriodDay) {
        totalDistance+=activity.distance
        if(activityDate < (week1End)) {
            firstWeekDistance+=activity.distance
        } else if (activityDate < (week2End)) {
            secondWeekDistance+=activity.distance
        } else if (activityDate < (week3End)) {
            thirdWeekDistance+=activity.distance
        } else {
            fourthWeekDistance+=activity.distance
        }
    }
})

return  { 
            averageDistance : Number((totalDistance/4).toFixed(1)),
            activities : [
               {
                    name: 'S1',
                    distance: firstWeekDistance
                },
                {
                    name: 'S2',
                    distance: secondWeekDistance
                },
                {
                    name: 'S3',
                    distance: thirdWeekDistance
                },
                {
                    name: 'S4',
                    distance: fourthWeekDistance
                }
            ]
        }
    
}