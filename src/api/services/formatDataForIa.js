import { DateTime } from "luxon"

/**
 * Renvoie un objet message pour le prompt IA, contenant les données utilisateur
 * @param {Number} totalDistance - distance totale parcourue
 * @param {DateTime} memberDate - date d'inscription de l'utilisateur
 * @param {String} height - la taille de l'utilisateur
 * @param {Number} - age - l'âde de l'utilisateur
 * @returns {Object} - objet message contenant les données de l'utilisateur
 */
export function formatActivitiesDataForIa(totalDistance, memberDate, height, age) {
    const today = DateTime.now()
    const reference = DateTime.fromISO(memberDate)
    const delay = Math.floor(today.diff(reference, 'days').days)
    const avgDistance = Math.floor(totalDistance/delay)

    return ({
        role: "user",
        content: `Voici mes statistiques depuis le ${memberDate?.toFormat('dd-MM-yy')} : j'ai couru en moyenne ${avgDistance} kilomètres par jour jusqu'à aujourd'hui. Je pèse ${height} kilos et j'ai ${age} ans.`
    })

}

/**
 * Renvoie un objet message pour le prompt IA, contenant les données du formulaire rempli par l'utilisateur
 * @param {Object} formData - données du formulaire
 * @returns {Object} - objet message contenant les données du formulaire saisi par l'utilisateur
 */
export function formatFormDataForIa(formData) {
    const messages = []
    let race = ""
    formData.raceType === "course-libre" ? race = `course libre de ${formData.distance} kilomètres` : race = `${formData.raceType} (${formData.distance} kilomètres)`
    messages.push(`Je souhaite faire une course type ${race}, le ${formData.startDate}. Le terrain est plutôt ${formData.terrainType}.`)
    
    let days = ""
    formData.days.forEach(day => days+=", "+day)
    const stringDays = days.slice(2)
    messages.push(`Je suis disponible pour courir chaque semaine les : ${stringDays}.`)

    if(formData.nutritionAdvice === "oui") {
        messages.push("je veux des conseils d'alimentation")
    }

    return (messages)
}