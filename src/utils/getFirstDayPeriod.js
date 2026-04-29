export default function getFirstDayPeriod(date, type) {
    let periodStart = null
    switch(type) {
        case "week" :
            periodStart = date.minus({ weeks: 4 })
            break
        case "day" :
            periodStart = date.minus({ days: 7 })
            break
    }
    
    return periodStart
}