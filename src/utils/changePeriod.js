import { DateTime } from 'luxon';

/**
 * Renvoie une date calculée à partir d'une date initiale, d'un type et d'un pas
 * @param {String} slot - le pas du décalage : un jour ou une semaine
 * @param {String} type - le type de décalalge : précédent ou suivant
 * @param {Object} date - la date de référence
 * @returns {Object} - une nouvelle date issue du décalage
 */
export default function changePeriod(slot, type, date) {
    if(type === "previous") {
      if(slot === "week") {
        return date.minus({ weeks: 1 })
      } else {
        return date.minus({ days: 1 })
      }
    } else {
      if(slot === "week") {
        return date.plus({ weeks: 1 })
      } else {
        return date.plus({ days: 1 })
      }
    }
}