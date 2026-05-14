import { DateTime } from "luxon"

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

export function formatFormDataForIa(formData) {

    console.log(formData.days)
    const messages = []
    let race = ""
    formData.raceType === "course-libre" ? race = `course libre de ${formData.distance} kilomètres` : race = `${formData.raceType} (${formData.distance} kilomètres)`
    messages.push(`Je souhaite faire une course type ${race}, le ${formData.startDate}. Le terrain est plutôt ${formData.terrainType}.`)
    
    let days = ""
    formData.days.forEach(day => days+=", "+day)
    const stringDays = days.slice(2)
    messages.push(`Je suis disponible pour courir chaque semaine les : ${stringDays}.`)

    if(formData.nutritionAdvice === "oui") {
        messages.push("J'ai également besoin de conseils de nutrition")
    }

    return (messages)
}