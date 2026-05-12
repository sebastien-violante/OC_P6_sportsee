import { DateTime } from 'luxon';

/**
 * Renvoie les dates de début et de fin de la semaine actuelle
 * @param {Object} date - la date du jour
 * @returns {Object} - weekstart : la date correspondant au lundi de la semaine actuelle
 * @returns {Object} - weekend : la date correspondant au dimanche de la semaine actuelle
 */
export default function getCurrentWeek(date) {
    const weekStart = date.startOf("week")
    const weekEnd = date.endOf("week")
    
    return { weekStart, weekEnd }
}