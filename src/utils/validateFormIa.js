import { DateTime } from "luxon"

/**
 * Valide ou non les données du formulaire transmises sous forme d'objet data et renvoie les erreurs détectées
 * @param {Object} data - les données récupérées dans le formulaire d'authentification
 * @returns {Object} - les erreurs éventuelles issues de la vérification des champs
 */
export default function validateFormIa(data) {

    const today = DateTime.now()
    const startDate = DateTime.fromISO(data.startDate)
    const errors = {}
    
    if(data.startDate === "") {
        errors.startDate = "Vous n'avez pas choisi de date de course"
    }
    const diffWeeks = (Math.floor(startDate.diff(today, 'weeks').weeks))
    if(diffWeeks < 6) errors.startDate = "Votre date de départ doit se trouver dans au moins 6 semaines"
    
    if(Number(data.distance) <= 0 || data.distance === null) { 
        errors.distance = "Vous devez saisir la distance de la course à préparer"
    }

    if(data.days.length === 0) {
        errors.days = "Vous devez saisir les jours où vous pouvez courir"
    }

    if(data.terrainType === "") {
        errors.terrainType = "Vous devez choisir un type de terrain"
    }
    
    return errors
}