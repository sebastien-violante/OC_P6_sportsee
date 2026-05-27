/**
 * Renvoie un formData complété des informations effectuées sur le formulaire à chaque changement sur un champ
 * @param {Function} setFormData - le setter de formData
 * @returns {Function} - une fonction associée à un élement du DOM
 */

export default function formIaHandleChange(setFormData) {
    return (event) => {
        // Récupération des données du champ concerné par l'event (event.target)
        const { name, value, type, checked } = event.target

        setFormData(prev => {
            if (type === "checkbox" && name === "days") {
                return {
                    ...prev,
                    days: checked
                        ? [...prev.days, value]
                        : prev.days.filter(d => d !== value)
                }
            }
            if (type === "checkbox") {
                return {
                    ...prev,
                    [name]: checked
                }
            }
            if (name === "raceType") {
                let distanceValue = ""

                switch (value) {
                    case "marathon":
                        distanceValue = 42.195
                        break
                    case "semi-marathon":
                        distanceValue = 21
                        break
                    case "10km":
                        distanceValue = 10
                        break
                }

                return {
                    ...prev,
                    raceType: value,
                    distance: distanceValue
                }
            }

            return {
                ...prev,
                [name]: value
            }
        })
    }
}