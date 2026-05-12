import { DateTime } from "luxon"

/**
 * Renvoie la date de début d'une période en fonction d'une date de référence et d'un type de période
 * @param {Object} date - la date de fin de la période
 * @param {String} type - le type de période ( semaine ou jour)
 * @returns {Object} - la date de début de la période
 */
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