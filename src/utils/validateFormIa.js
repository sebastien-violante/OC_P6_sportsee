import { DateTime } from "luxon"

export default function validateFormIa(data) {

    const today = DateTime.now()
    const startDate = DateTime.fromISO(data.startDate)
    const errors = {}
    console.log(data)
    
    if(data.startDate === "") {
        errors.date = "Vous n'avez pas choisi de date de course"
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