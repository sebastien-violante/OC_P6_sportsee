import { DateTime } from 'luxon';

/**
 * Renvoie un entier indiquant le nombre de semaines entre les deux dates fournies
 * @param {Object} date - la date dont on veut déterminer l'écart en semaines
 * @param {Object} referenceDate - la date de référence
 * @returns {Number} - le nombre de semaines entre les deux dates
 */
export default function getActivityPosition(date, referenceDate) {

    const activity = DateTime.fromISO(date);
    const diffWeeks = Math.floor(referenceDate.diff(activity, 'weeks').weeks);
    if (diffWeeks >= 0 && diffWeeks < 4) {
        return diffWeeks;
    }
    return null;
}