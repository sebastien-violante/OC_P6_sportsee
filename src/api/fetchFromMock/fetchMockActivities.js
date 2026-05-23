import { activitiesMock } from '../mock/activities'

/**
 * Simule la réponse d'une api à un fetch de mock/activities, avec une réponse en json, un statut et un délai d'attente
 * @returns {Object} - les données d'acitivités provenant du mock au format json
 */
export function fetchMockActivities() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                ok: true,
                status: 200,
                json: async () => activitiesMock
            })
        }, 500)  // simulation de timeout 
    })
}