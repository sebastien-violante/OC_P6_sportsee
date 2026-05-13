import { DateTime } from 'luxon';

/**
 * Renvoie un entier indiquant le nombre de jours entre les deux dates fournies
 * @param {Object} date - la date dont on veut déterminer l'écart en jours
 * @param {Object} referenceDate - la date de référence
 * @returns {Number} - le nombre de jours entre les deux dates
 */
export default function getBpmPosition(date, referenceDate) {

    const activity = DateTime.fromISO(date).startOf('day');
    const reference = DateTime.fromISO(referenceDate).startOf('day');
    const diffDays = Math.floor(reference.diff(activity, 'days').days);
    if (diffDays >= 0 && diffDays < 7) {
        return diffDays;
    }
    return null;
}