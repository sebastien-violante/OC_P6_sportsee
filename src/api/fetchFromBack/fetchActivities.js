import { fetchMockActivities } from "../fetchFromMock/fetchMockActivities"

/**
 * Renvoie les données d'activité provenant de l'API en fonction d'une date de début, d'une date de fin, d'un token et du mode api/mock
 * @param {Boolean} useMock - définit le mode (1: mock, 0: api)
 * @param {String} token - le token de l'utilisateur
 * @param {Object} startDate - début de la période de recherche
 * @param {Object} endDate - fin de la période de recherche
 * @returns {Object} - les données d'activité sur la période selon le mode
 */
export default async function fetchActivities(useMock, token, startDate, endDate) {
    try {
        // si en mode api il n'y a pas de token, sortie de la fonction
        if (!useMock && !token) {
            throw new Error("Token manquant")
        }
        let result = null
        // requête api ou mock service en fonction de l'état de useMock
        if(!useMock) {
            result = await fetch(`http://localhost:8000/api/user-activity?startWeek=${startDate}&endWeek=${endDate}`, { headers: {Authorization: `Bearer ${token}`} })
        } else {
            result = await fetchMockActivities()
        }
        if(!result.ok) {
            throw new Error(`Erreur ${result.status}`)
        }
        const data = await result.json()
        return data
    }
    catch (error) {
        console.error('Pas de récupération des données', error.message)
        throw error
    }
} 
   